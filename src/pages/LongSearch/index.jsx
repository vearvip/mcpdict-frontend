import { useEffect, useState } from 'react';
import styles from './index.module.less';
import NoData from '@/components/NoData';
import LogoBlock from "@/components/LogoBlock";
import { Button, Input, message } from 'antd';
import { extractHanzi } from '@vearvip/hanzi-utils'
import useStore from '@/store';
import NProgress from 'nprogress';
import { queryLongString } from '../../services';
import { copy, formatSearchData, generateColorOrGradient, getBackgroundColorByName, groupVariants, splitStringInto2DArray } from '../../utils';
import Char from './components/Char';
import { getLocalFilterData, setLocalFilterData, showFilterDialog } from '../../components/Filter';
import { SettingOutlined } from '@ant-design/icons';
import { getLocalPageSettingData } from '../Setting';
import { JianCheng, ShengDiao } from '../../utils/constant';
import { useRef } from 'react';
import { useAsyncEffect } from 'ahooks';

/**
 * 长文搜索组件，用于处理长文本的注音搜索。
 *
 * @param {Object} props - 组件属性。
 */
const LongSearch = () => {
  const { store } = useStore()

  const styleTagRef = useRef()

  const localPageSettingData = getLocalPageSettingData()
  const [originTextAreaValue, setOriginTextAreaValue] = useState('')
  const [textAreaValue, setTextAreaValue] = useState('')

  const [filterData, setFilterData] = useState(
    getLocalFilterData()
  )
  const [charVariantInfos, setCharVariantsInfos] = useState()

  const twoDimensionalCharListRef = useRef([])


  const handleTextareaChange = (e) => {
    const value = e?.target?.value
    setOriginTextAreaValue(value)
  }

  const handleClickSetting = () => {
    filterData.filterMode = 'lang'
    showFilterDialog({
      tmpMode: true,
      hiddenQueryType: true,
      tmpFilterData: filterData,
      onOk(filterData) {
        setFilterData({
          ...filterData
        })

        const localFilterData = getLocalFilterData()
        localFilterData.dialectName = filterData.dialectName
        // console.log('localFilterData', filterData)
        setLocalFilterData(localFilterData)
        handleSearch(filterData)
        showDialectNameTag(filterData.dialectName)
      },
      onClose() {
        // setLocalFilterData()
      }
    })
  }

  function genCharVariantInfos(charGroupList = []) {
    console.log('charGroupList', charGroupList);
    const charVariantInfoStruct = {};
    charGroupList
      .filter(item => item.charInfo && Array.isArray(item.charInfo) && item.charInfo.length > 0)
      .forEach(charItem => {
        const charVariantInfoItem = {
          "char": charItem.char,
          "phonetics": (charItem.charInfo || []).map(charInfoItem => (charInfoItem.infos || []).map(info => info.phonetic)).flat(),
        }
        if (!charVariantInfoStruct[charItem.originChar]) {
          charVariantInfoStruct[charItem.originChar] = [charVariantInfoItem]
        } else {
          charVariantInfoStruct[charItem.originChar].push(charVariantInfoItem)
        }
      })
    return Object.keys(charVariantInfoStruct).map(char => ({
      char,
      charInfos: charVariantInfoStruct[char],
    }));
  }
  const handleSearch = async (filterData) => {
    if (!filterData?.dialectName) {
      message.warning('请选择语言')
      handleClickSetting()
      return
    }

    const chars = extractHanzi(originTextAreaValue || '')
    if (chars.length === 0) {
      setCharVariantsInfos(undefined)
      setTextAreaValue('')
      message.warning('请输入需要注音的汉字')
      return
    }

    NProgress.start();
    try {
      const result = await queryLongString({
        charList: chars,
        dialectName: filterData.dialectName
      });

      const groupVariantList = groupVariants(chars, result?.data?.variants ?? [])
      let charGroupList = [];

      groupVariantList.forEach((groupItem) => {
        charGroupList = [
          ...charGroupList,
          ...formatSearchData(result?.data?.data, groupItem.variants, groupItem.char, store.dialectSort)
        ]
      });

      setCharVariantsInfos(genCharVariantInfos(charGroupList))
      setTextAreaValue(originTextAreaValue)
    } catch (e) {
      console.error('长文搜索出错：', e)
      // request 层已经提示；保留上一次成功结果，避免出错时整页清空
    } finally {
      NProgress.done();
    }
  }




  const handleCopy = () => {
    const twoDimensionalCharList = twoDimensionalCharListRef.current
    // console.log('twoDimensionalCharList', twoDimensionalCharList)
    let textContent = ``
    twoDimensionalCharList.forEach((level1Item) => {
      level1Item.forEach(
        /**
         * 
         * @param {Object} level2Item 
         * @param {string} level2Item.phonetic ipa国际音标
         * @param {string} level2Item.tonePitch 调值
         * @param {string} level2Item.tone 音类
         * @param {string} level2Item.char 汉字
         * @param {number} level2Index 
         */
        (level2Item) => {
          // console.log('level2Item', level2Item)
          let { phonetic = '', tonePitch = '', tone = '', char = '' } = level2Item
          textContent = `${textContent}${phonetic}${tonePitch}${tone} ${char} `

        }
      )
      textContent = `${textContent}\n`
    })
    console.log('textContent', textContent)
    copy(textContent)
  }

  const handleCharChange = (charItem, charItemLevel1Index, charItemLevel2Index) => {
    // console.log('charItem, charItemLevel1Index, charItemLevel2Index', charItem, charItemLevel1Index, charItemLevel2Index)
    const twoDimensionalCharList = twoDimensionalCharListRef.current
    // console.log('twoDimensionalCharList', twoDimensionalCharList)
    // 如果二维数据的第一层的指定下标为空，则创建一个空数组
    if (
      !Array.isArray(twoDimensionalCharList[charItemLevel1Index])
    ) {
      twoDimensionalCharList[charItemLevel1Index] = []
    }
    // 然后开始赋值
    twoDimensionalCharList[charItemLevel1Index][charItemLevel2Index] = charItem
    twoDimensionalCharListRef.current = (twoDimensionalCharList)
  }

  // 把没有读音的字也记录到二维数组里，保证“复制”不会漏字。
  // 放在 effect 里做，避免在 render 期间修改 ref。
  useEffect(() => {
    if (!charVariantInfos || !textAreaValue) return
    const lines = splitStringInto2DArray(textAreaValue)
    const next = []
    lines.forEach((line, lineIndex) => {
      next[lineIndex] = []
      line.forEach((char, charIndex) => {
        const existing = twoDimensionalCharListRef.current[lineIndex]?.[charIndex]
        if (existing && existing.char === char) {
          next[lineIndex][charIndex] = existing
          return
        }
        const infos = charVariantInfos.find((info) => info.char === char)?.charInfos
        if (!infos || infos.length === 0) {
          next[lineIndex][charIndex] = { phonetic: '', tonePitch: '', tone: '', char }
        }
      })
    })
    twoDimensionalCharListRef.current = next
  }, [charVariantInfos, textAreaValue])

  function showDialectNameTag(dialectName) {
    if (!dialectName) {
      return
    }
    clearDialectNameTag()
    const backgroundColor = generateColorOrGradient(getBackgroundColorByName(dialectName, store.dialectInfos))
    // console.log('backgroundColor', backgroundColor)
    // 创建 <style> 标签并设置其内容
    styleTagRef.current = document.createElement('style');
    styleTagRef.current.type = 'text/css';
    styleTagRef.current.innerHTML = `
      .long_search_textarea::after {
        content: '${dialectName}';
        display: block;
        background: ${backgroundColor};
        width: fit-content;
        padding: 0 4px;
        white-space: nowrap;
        height: fit-content;
        color: white;
        border-radius: 4px;
        font-size: 12px; 
        position: absolute;
        bottom: 25px;
        right: 3px;
        opacity: 70%;
        user-select: none;
      }
    `;
    document.head.appendChild(styleTagRef.current);

  }

  function clearDialectNameTag() {
    if (styleTagRef.current) {
      try {
        document?.head?.removeChild && document.head.removeChild(styleTagRef.current);
      } catch (error) {
        console.error('⚠️ 移除 <style> 标签出错：', error)
      }
    }
  }

  useEffect(() => {
    // 清理函数：当组件卸载时移除 <style> 标签
    return () => clearDialectNameTag();
  }, []);


  useAsyncEffect(async () => {
    if (
      !store.dialectInfos
      || !Array.isArray(store.dialectInfos)
      || store.dialectInfos.length === 0
    ) {
      console.warn('⚠️ dialectInfos 尚未准备好')
      return
    }
    const localFilterData = getLocalFilterData()
    showDialectNameTag(localFilterData.dialectName)
  }, [store]);

  return (
    <>
      <div className={styles.search_bar}>
        <div className={styles.logo_block}><LogoBlock /></div>
        <Input.TextArea
          value={originTextAreaValue}
          maxLength={400}
          placeholder="长文注音，单次查询限制400字，请在右侧设置按钮选择语言，多音字于下方显示蓝点标记提示。"
          showCount
          className="long_search_textarea"
          autoSize={{ minRows: 4, maxRows: 10 }}
          style={{
            width: '650px'
          }}
          styles={{
            count: {
              // border: '1px solid red',
              // position: 'relative',
              bottom: '2px',
              paddingRight: '5px'
            }
          }}
          onChange={handleTextareaChange} />
        <div className={styles.btn_box}>
          <div className={styles.setting_btn} onClick={() => handleClickSetting()}>
            <SettingOutlined />
          </div>
          <br />
          <button className={styles.search_btn} onClick={() => handleSearch(filterData)}>搜索</button>
        </div>
        {/* <div className={styles.dialect_name_tag}>
          {filterData?.dialectName ?? '未選擇'}
        </div> */}
      </div>
      <div className={styles.search_content} id="search_content">
        {charVariantInfos ? (
          <div className={styles.search_content_main}>
            <Button type="link" style={{
              // position: 'absolute',
              // top: 0,
              // right: '-10px'
              padding: 0,
              paddingLeft: 0,
              paddingRight: 0,
              // border: '1px solid red',
              marginTop: -5,
              marginRight: -3,
              float: 'right'
            }} onClick={handleCopy}>复制</Button>
            {
              textAreaValue ? splitStringInto2DArray(textAreaValue).map((line, lineIndex) => {
                return <div key={`line${lineIndex}`}>
                  {
                    line.map((char, charIndex) => {
                      const charInfos = charVariantInfos.find((info) => info.char === char)?.charInfos
                      if (!charInfos || charInfos.length === 0) {
                        return <span
                          key={`lineIndex_${lineIndex}_charIndex_${charIndex}_char_${char}`}
                          style={{
                            color: '#666',
                            textAlign: 'center',
                            margin: '0 2px',
                          }}
                        >{char}</span>
                      } else {
                        // console.log('char', char, charInfos)
                        return <Char
                          key={`lineIndex_${lineIndex}_charIndex_${charIndex}_char_${char}`}
                          charInfos={charInfos}
                          localPageSettingData={localPageSettingData}
                          toneMapConfig={store?.dialectInfos?.find(dialectItem => {
                            return dialectItem[JianCheng] === filterData.dialectName
                          })?.[ShengDiao]}
                          onChange={charItem => handleCharChange(charItem, lineIndex, charIndex)}
                        />

                      }
                    })
                  }
                </div>
              }) : null
            }
          </div>
        ) : (
          <NoData />
        )}
      </div>

    </>
  );
};

export default LongSearch;



