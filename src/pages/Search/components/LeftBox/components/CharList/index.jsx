import React, { useState, useEffect, useMemo } from 'react';
import styles from './index.module.less'; // 引入 CSS Module  
import AutoFitText from '@/components/AutoFitText';
import { Button, notification } from 'antd';
import NoData from '@/components/NoData';
import { copy, parseSplitStr } from '@/utils';
import { usePad, useWindowSize, useMobile } from '@/utils/hooks';
import CharLabel from '../CharLabel';
import CharPhoneticExplain from '../CharPhoneticExplain';
import { useNavigate } from 'react-router';
import { message } from 'antd';
import {
  ShuoWen,
  HuiZuan,
  KangXi,
  HanDa,
  TongYiMa,
  YiTiZi,
  ZiXingBianTi,
  ZiXingMiaoShu,
  BuJianJianSuo,
  LiangFen,
  ZongBiHuaShu,
  BuShouYuBi,
  WuBiHua,
  WuBi86,
  WuBi98,
  WuBi06,
  CangJie3,
  CangJie5,
  CangeJie6,
  ShanRenMaLTS,
  JianCheng,
  ShengDiao
} from '@/utils/constant';
import { queryCharInfo } from '@/services';
import { formatShuowenText } from '@/utils';
import { hanzi2Unicode } from '@vearvip/hanzi-utils'
import { Spin } from 'antd';
import useStore from '@/store';
import { getLocalPageSettingData } from '@/pages/Setting';
import { useSize } from 'ahooks';

import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import 'react-virtualized/styles.css'; // 不要忘记引入默认样式 

/**
 * 左侧盒子组件，用于展示搜索数据。
 */
const CharList = (props) => {
  const { searchData } = props;
  const { store } = useStore()
  const isPad = usePad()
  const isMobile = useMobile()
  const windowSize = useWindowSize();
  const charListBoxSize = useSize(document.querySelector('#char_list_box'))
  const [selectedCharItem, setSelectedCharItem] = useState()
  const [selectedCharInfos, setSelectedCharInfos] = useState()
  const [uniCodeLoading, setUniCodeLoading] = useState(false)
  const [handaLoading, setHandaLoading] = useState(false)
  const [kangxiLoading, setKangxiLoading] = useState(false)
  const [shuowenLoading, setShuowenLoading] = useState(false)
  const [huizuanLoading, setHuizuanLoading] = useState(false)
  const localPageSettingData = getLocalPageSettingData();
  let navigate = useNavigate();
  const virtualizedCache = new CellMeasurerCache({
    defaultHeight: 30, // 设置一个默认高度作为初始值
    fixedWidth: true,  // 如果宽度固定，则设置为true；否则为false
  })

  const isEmptyCharInfo = (charInfo = []) => {
    let isEmpty = true
    charInfo.forEach(item => {
      if (item.explain) {
        isEmpty = false
      }
    })
  }

  const handleMapClick = (value) => {
    navigate('/map?q=' + value);
  }

  function handleImgClick(char) {
    copy(char)
  }

  function requestAndShowCharInfoByKey(char, infoKey, callback) {
    queryCharInfo({
      char: char,
      infoKeyList: [infoKey]
    }).then(result => {
      const { data } = result
      let infoStr = formatShuowenText(
        data?.[0]?.[infoKey] ?? '',
        infoKey
      )
      callback();
      notification.open({
        message: false,
        duration: false,
        description: <div style={{
          width: '100%',
          height: '70vh',
          boxSizing: 'border-box',
          overflowX: 'hidden',
          overflowY: 'auto'
        }}>
          {
            infoStr
              ? <div dangerouslySetInnerHTML={{ __html: infoStr }} />
              : <NoData />
          }

        </div>,
      });
    }).catch((error) => {
      console.log(error)
      callback();
    })
  }
  function handleUnicodeClick(char) {
    setUniCodeLoading(true)
    // const regionMap = {
    //   G: '陸',
    //   H: '港',
    //   T: '臺',
    //   J: '日',
    //   K: '韓',
    //   P: '朝',
    //   V: '越',
    // }
    queryCharInfo({
      char: char,
      infoKeyList: [
        YiTiZi,
        ZiXingBianTi,
        ZiXingMiaoShu,
        LiangFen,
        ZongBiHuaShu,
        BuShouYuBi,
        WuBiHua,
        WuBi86,
        WuBi98,
        WuBi06,
        CangJie3,
        CangJie5,
        CangeJie6,
      ]
    }).then(result => {
      const { data } = result
      let realData = data?.[0] ?? {}
      setUniCodeLoading(false)
      notification.open({
        message: false,
        duration: false,
        description: <div style={{
          width: '100%',
          height: '70vh',
          boxSizing: 'border-box',
          overflowX: 'hidden',
          overflowY: 'auto'
        }}>
          <div>【統一碼】U+{hanzi2Unicode(char)}</div>
          <div>【異體字】{realData[YiTiZi]}</div>
          <div>【字形變體】{realData[ZiXingBianTi]}</div>
          <div>【字形描述】{realData[ZiXingMiaoShu]}</div>
          {/* <div>【部件檢索】{realData[BuJianJianSuo]}</div> */}
          <div>【兩分】{realData[LiangFen]}</div>
          <div>【總筆畫數】{realData[ZongBiHuaShu]}</div>
          <div>【部首餘筆】{realData[BuShouYuBi]}</div>
          <div>【五筆畫】{realData[WuBiHua]}</div>
          <div>【五筆86版】{realData[WuBi86]}</div>
          <div>【五筆98版】{realData[WuBi98]}</div>
          <div>【五筆06版】{realData[WuBi06]}</div>
          <div>【倉頡三代】{realData[CangJie3]}</div>
          <div>【倉頡五代】{realData[CangJie5]}</div>
          <div>【倉頡六代】{realData[CangeJie6]}</div>
          {/* <div>【山人碼LTS】{realData[ShanRenMaLTS]}</div> */}

        </div>,
      });
    }).catch(e => {
      console.error(e);
      setUniCodeLoading(false)
    });
  }

  function handleShuowenClick(char) {
    setShuowenLoading(true)
    requestAndShowCharInfoByKey(char, ShuoWen, () => setShuowenLoading(false))
  }
  function handleKangxiClick(char) {
    setKangxiLoading(true)
    requestAndShowCharInfoByKey(char, KangXi, () => setKangxiLoading(false))
  }
  function handleHuizuanClick(char) {
    setHuizuanLoading(true)
    requestAndShowCharInfoByKey(char, HuiZuan, () => setHuizuanLoading(false))
  }
  function handleHandaClick(char) {
    setHandaLoading(true)
    requestAndShowCharInfoByKey(char, HanDa, () => setHandaLoading(false))
  }

  function rowRenderer({ index: infoIndex, key, parent, style }) {
    const charInfo = selectedCharInfos[infoIndex];
    // console.log('🍓', height, width)
    let itemElement
    if (infoIndex === 0) {
      itemElement = <div>
        <div
          className={styles.char_list_top_info}
        >
          <div
            className={styles.char_img_box}
            onClick={() => handleImgClick(charInfo.char)}
          > <img
              src={`https://assets.mcpdict.vear.vip/imgs/other/田字格.png`}
              className={styles.char_bg} alt="" />
            <img
              src={`https://assets.mcpdict.vear.vip/imgs/tianHeng/${charInfo.char}.png`}
              className={styles.char_img}
            />
          </div>
          <div className={styles.char_btns}>
            <Spin spinning={uniCodeLoading} size="small">
              <div className={styles.char_unicode} onClick={() => handleUnicodeClick(charInfo.char)}>
                U+{hanzi2Unicode(charInfo.char)}
              </div>
            </Spin>
            <Spin spinning={shuowenLoading} size="small">
              <div className={styles.char_shuowen} onClick={() => handleShuowenClick(charInfo.char)}>
                说文
              </div>
            </Spin>
            <Spin spinning={kangxiLoading} size="small">
              <div className={styles.char_kangxi} onClick={() => handleKangxiClick(charInfo.char)}>
                康熙
              </div>
            </Spin>
            <Spin spinning={huizuanLoading} size="small">
              <div className={styles.char_huizuan} onClick={() => handleHuizuanClick(charInfo.char)}>
                汇纂
              </div>
            </Spin>
            <Spin spinning={handaLoading} size="small">
              <div className={styles.char_handa} onClick={() => handleHandaClick(charInfo.char)}>
                汉大
              </div>
            </Spin>
            <div className={styles.char_map} onClick={() => handleMapClick(charInfo.char)}>
              🌎️
            </div>
          </div>

        </div>

        {
          selectedCharInfos.length === 1 ?
            <div className="flex-center" >
              <NoData style={{
                position: 'relative'
              }} />
            </div>
            : null
        }
      </div>
    } else {
      itemElement = (
        <div key={`char_info_${infoIndex}`} className={styles.char_info}>
          <AutoFitText
            char={selectedCharItem?.char}
            dialectName={charInfo.dialectName}
            phonetics={charInfo.infos.map(ele => ele.phonetic)}
          />
          <div>
            {charInfo.infos.map((info, subIndex) => (
              <CharPhoneticExplain
                key={`info_item_${infoIndex}_${subIndex}`}
                localPageSettingData={localPageSettingData}
                phonetic={info.phonetic}
                explain={info.explain}
                toneMapConfig={store?.dialectInfos?.find(dialectItem => {
                  return dialectItem[JianCheng] === charInfo.dialectName
                })?.[ShengDiao]}
              />
            ))}
          </div>
        </div>
      );
    }
    return (
      <CellMeasurer
        key={key}
        cache={virtualizedCache}
        parent={parent}
        columnIndex={0} // 对于列表来说，这个参数通常为0
        rowIndex={infoIndex}
      >
        {({ registerChild }) => (
          <div ref={registerChild} style={style}>
            {itemElement}
          </div>
        )}
      </CellMeasurer>
    );
  }

  useEffect(() => {
    // 搜索展示时默认跳过为空的项
    let hasValIndex = searchData.findIndex(item => Object.keys(item.charInfo).length > 0)
    hasValIndex = hasValIndex === -1 ? 0 : hasValIndex
    // console.log('hasValIndex', hasValIndex)
    setSelectedCharItem(searchData[hasValIndex]) 
    setSelectedCharInfos([
      {
        char: searchData[hasValIndex].char,
      },
      ...(searchData[hasValIndex].charInfo || [])
    ])

  }, [
    searchData
  ])

  return (
    <>
      <div
        id="char_list_box"
        className={`${styles.char_list_box}`}
        style={{
          ...(
            isPad ? {} : {
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }
          ),
          height: isMobile
            ? ' calc(100vh - 60px - 80px - 40px - 40px + 92px)' // 92px 是mobile模式下被隐藏的搜索bar的高度
            : ' calc(100vh - 60px - 80px - 40px - 40px)'
        }}
      >
        <div className={isPad ? styles.char_list_box_left_mobile : styles.char_list_box_left} >
          {/* <Button onClick={() => console.log(searchData)}>asdf</Button> */}
          {
            searchData.map(charItem => {
              return <Button
                color={
                  `${charItem?.char}_${charItem?.originChar}` === `${selectedCharItem?.char}_${selectedCharItem?.originChar}` ? "primary" : 'default'
                }
                key={`${charItem.char}_${charItem.originChar}`}
                variant="filled"
                style={{
                  width: isPad ? '60px' : '80px',
                  flexShrink: 0,
                  ...(
                    isPad ? {
                      marginRight: 5
                    } : {
                      marginBottom: 5,
                    }
                  )
                }}
                onClick={() => {
                  setSelectedCharItem(charItem) 
                  setSelectedCharInfos([
                    {
                      char: charItem.char,
                    },
                    ...(charItem.charInfo || [])
                  ])
                }}
              >
                <CharLabel char={charItem.char} originChar={charItem.originChar} />
              </Button>
            })
          }
        </div>
        <div className={isPad ? styles.char_list_box_right_mobile : styles.char_list_box_right} >
          {
            (selectedCharInfos && Array.isArray(selectedCharInfos) && selectedCharInfos.length > 0)
              ? <>
                <div
                  style={{
                    boxSizing: 'border-box',
                    // border: '1px solid red',
                    height: (isPad
                      ? charListBoxSize?.height - 44
                      : charListBoxSize?.height) || undefined,
                    width: (isPad
                      ? charListBoxSize?.width
                      : charListBoxSize?.width - 90) || undefined

                  }}
                >
                  <AutoSizer>
                    {({ height, width }) => (
                      <List
                        width={width}
                        height={height}
                        scrollToIndex={0}
                        rowCount={selectedCharInfos?.length}
                        rowHeight={virtualizedCache.rowHeight} // 使用缓存中的高度信息
                        deferredMeasurementCache={virtualizedCache} // 将缓存传递给List组件
                        style={{
                          padding: isMobile ? '5px 10px' : '10px 15px',
                        }}
                        rowRenderer={rowRenderer}
                      />
                    )}
                  </AutoSizer>
                </div>

              </>
              : <div className="flex-center">
                <NoData style={{
                  position: 'relative'
                }} />
              </div>
          }

        </div>


      </div>

    </>
  );
};

export default CharList;



