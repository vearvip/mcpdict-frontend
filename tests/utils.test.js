import { describe, expect, test, vi } from 'vitest'

vi.mock('@/pages/Setting', () => ({
  getLocalPageSettingData: () => ({
    partitionMode: '地圖集二分區',
    toneType: 'baSheng',
    tonePitchType: 'curve',
    searchPageFormat: 'labelList',
    longSearchPageFormat: 8,
    mapPageMarkerSize: 'small',
  }),
}))
import {
  buildDistrictTree,
  convertPitchNum2Curve,
  formatSearchData,
  getSearchDialectList,
  groupVariants,
  parseSplitStr,
  transformDialectInfosToTree,
} from '@/utils'
import { parseLngLat } from '@/components/MapTiler/util'
import {
  DiTuJiErFenQv,
  JianCheng,
  Sheng,
  Shi,
  Xian,
  ZiZu,
  YuYan,
  DuYin,
  ZhuShi,
} from '@/utils/constant'

describe('groupVariants', () => {
  test('keeps base chars and attaches variants', () => {
    expect(groupVariants(['說', '明'], ['說', '説', '明', '朙'])).toEqual([
      { char: '說', variants: ['說', '説'] },
      { char: '明', variants: ['明', '朙'] },
    ])
  })

  test('always includes the base char', () => {
    expect(groupVariants(['說'], ['説'])).toEqual([
      { char: '說', variants: ['說', '説'] },
    ])
  })
})

describe('parseLngLat', () => {
  test('parses lng,lat and rejects invalid values', () => {
    expect(parseLngLat('116.4,39.9')).toEqual([116.4, 39.9])
    expect(parseLngLat('')).toBeNull()
    expect(parseLngLat('x,39.9')).toBeNull()
    expect(parseLngLat('116.4')).toBeNull()
    expect(parseLngLat('200,39.9')).toBeNull()
  })
})

describe('pitch and split helpers', () => {
  test('convertPitchNum2Curve', () => {
    expect(convertPitchNum2Curve('35')).toBe('˧˥')
    expect(convertPitchNum2Curve('33')).toBe('˧')
    expect(convertPitchNum2Curve('')).toBe('')
  })

  test('parseSplitStr', () => {
    expect(parseSplitStr('tsin1{test}', '普通話')).toEqual([
      { phonetic: 'tsin1', explain: 'test' },
    ])
    expect(parseSplitStr('tsin1', '普通話')).toEqual([
      { phonetic: 'tsin1', explain: '' },
    ])
  })
})

describe('dialect tree helpers', () => {
  test('transformDialectInfosToTree uses fullwidth separator and preserves hierarchy', () => {
    localStorage.setItem(
      'pageSettingData',
      JSON.stringify({ partitionMode: DiTuJiErFenQv }),
    )
    const rows = [
      {
        [JianCheng]: 'A',
        [DiTuJiErFenQv]: '官話－北京－京師',
      },
      {
        [JianCheng]: 'B',
        [DiTuJiErFenQv]: '官話－北京－京師',
      },
      {
        [JianCheng]: 'C',
        [DiTuJiErFenQv]: '吳語－太湖',
      },
    ]
    const tree = transformDialectInfosToTree(rows)
    expect(tree.map((node) => node.title)).toEqual(['官話', '吳語'])
    expect(tree[0].children[0].title).toBe('北京')
    expect(tree[0].children[0].children[0].title).toBe('京師')
    expect(tree[0].children[0].children[0].dialects).toEqual(['A', 'B'])
  })

  test('buildDistrictTree keeps children and filters slash placeholders', () => {
    const rows = [
      {
        [Sheng]: '北京',
        [Shi]: '北京',
        [Xian]: '/',
        [JianCheng]: '北京',
      },
      {
        [Sheng]: '江蘇',
        [Shi]: '蘇州',
        [Xian]: '吳江',
        [JianCheng]: '蘇州',
      },
    ]
    const tree = buildDistrictTree(rows)
    expect(tree.find((node) => node.title === '北京')).toBeTruthy()
    expect(tree.find((node) => node.title === '江蘇').children[0].title).toBe('蘇州')
    expect(tree.find((node) => node.title === '江蘇').children[0].children[0].title).toBe('吳江')
    expect(JSON.stringify(tree)).not.toContain('"/"')
  })

  test('getSearchDialectList handles area tree', () => {
    const tree = [
      {
        title: '官話',
        value: '官話',
        dialects: ['A', 'B'],
        children: [{ title: '北京', value: '官話-北京', dialects: ['A'] }],
      },
    ]
    expect(
      getSearchDialectList({ filterMode: 'area', dialectArea: '官話' }, tree, []),
    ).toEqual(['A', 'B'])
    expect(
      getSearchDialectList({ filterMode: 'area', dialectArea: '官話-北京' }, tree, []),
    ).toEqual(['A'])
  })
})

describe('formatSearchData', () => {
  test('keeps only configured dialect sort and shape', () => {
    const rows = [
      {
        [ZiZu]: '說 説',
        [YuYan]: 'A',
        [DuYin]: 'a1',
        [ZhuShi]: '',
      },
      {
        [ZiZu]: '說 説',
        [YuYan]: 'B',
        [DuYin]: 'b1',
        [ZhuShi]: '',
      },
    ]
    const result = formatSearchData(rows, ['說'], '說', ['B', 'A'])
    expect(result).toHaveLength(1)
    expect(result[0].char).toBe('說')
    expect(result[0].originChar).toBe('說')
    expect(result[0].charInfo.map((item) => item.dialectName)).toEqual(['B', 'A'])
    expect(result[0].charInfo[0].infos[0].phonetic).toBe('b1')
  })
})
