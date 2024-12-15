import React, { useState, useEffect, useMemo } from 'react';
import styles from './index.module.less'; // 引入 CSS Module  
import AutoFitText from '@/components/AutoFitText';
import { Button, notification } from 'antd';
import NoData from '@/components/NoData';
import { copy, parseSplitStr } from '@/utils';
import { usePad, } from '@/utils/hooks';
import VirtualScroll from "react-dynamic-virtual-scroll";
import CharLabel from '../CharLabel';
import CharPhoneticExplain from '../CharPhoneticExplain';
import { useNavigate } from 'react-router';
import { message } from 'antd';
import { ShuoWen, HuiZuan, KangXi, HanDa } from '@/utils/constant';
import { queryCharInfo } from '@/services';
import { formatShuowenText } from '../../../../../../utils';  




/**
 * 左侧盒子组件，用于展示搜索数据。
 */
const CharList = (props) => {
  const { searchData } = props;
  const isPad = usePad()
  const [selectedCharItem, setSelectedCharItem] = useState()
  const [selectedCharInfos, setSelectedCharInfos] = useState()
  let navigate = useNavigate();
  /**
   * 解析方言数据，根据提供的数据结构生成解析后的信息数组。
   *
   * @param {Object.<string, any>} data - 包含方言名称及其对应信息字符串的对象。
   * @returns {Array<Object>} 解析后的方言信息数组。
   */
  function parseDialectData(data) {
    const parsedData = [];

    for (const [dialectName, infoString] of Object.entries(data)) {


      // 添加解析后的信息到最终结果数组中
      parsedData.push({ dialectName, infos: parseSplitStr(infoString) });
    }

    return parsedData;
  }

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

  function requestAndShowCharInfoByKey(char, infoKey) {
    queryCharInfo({
      char: char,
      infoKeyList: [infoKey]
    }).then(result => {
      const { data } = result
      let infoStr = formatShuowenText(
        data?.[0]?.[infoKey] ?? ''
      ) 
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
          <div dangerouslySetInnerHTML={{__html: infoStr}}  />
        </div>, 
      });
    })
  }
  function handleUnicodeClick(char) {
    message.info('🚧施工中...')
  }
  
  function handleShuowenClick(char) { 
    requestAndShowCharInfoByKey(char, ShuoWen)
  }
  function handleKangxiClick(char) {
    requestAndShowCharInfoByKey(char, KangXi)
  }
  function handleHuizuanClick(char) {
    requestAndShowCharInfoByKey(char, HuiZuan)
  }
  function handleHandaClick(char) {
    requestAndShowCharInfoByKey(char, HanDa)
  }

  useEffect(() => {
    setSelectedCharItem(searchData[0])
    const parsedDialectData = parseDialectData(searchData[0].charInfo)
    // console.log('parsedDialectData', parsedDialectData)
    setSelectedCharInfos([
      {
        char: searchData[0].char,
      },
      ...(parsedDialectData || [])
    ])

  }, [
    searchData
  ])

  return (
    <>
      <div
        className={`${styles.char_list_box}`}
        style={{
          ...(
            isPad ? {} : {
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }
          )
        }}
      >
        <div className={isPad ? styles.char_list_box_left_mobile : styles.char_list_box_left} >
          {
            searchData.map(charItem => {
              return <Button
                color={
                  charItem.char === selectedCharItem?.char ? "primary" : 'default'
                }
                key={charItem.char}
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
                  const parsedDialectData = parseDialectData(charItem.charInfo)
                  // console.log('parsedDialectData', parsedDialectData)
                  setSelectedCharInfos([
                    {
                      char: charItem.char,
                    },
                    ...(parsedDialectData || [])
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
              ? <VirtualScroll
                className={
                  isPad ? styles.virtual_list_mobile : styles.virtual_list
                }
                minItemHeight={30}
                totalLength={selectedCharInfos?.length}
                renderItem={(infoIndex) => {
                  const charInfo = selectedCharInfos[infoIndex];
                  // console.log('infoIndex charInfo', infoIndex, charInfo)
                  if (infoIndex === 0) {
                    return <div>
                      <div
                        className={styles.char_nav}
                      >
                        <div
                          className={styles.char_img_box}
                          onClick={() => handleImgClick(charInfo.char)}
                        > <img
                            src={`https://cdn.jsdelivr.net/gh/vearvip/hanzi-imgs@v3/src/assets/田字格.png`}
                            className={styles.char_bg} alt="" />
                          <img
                            src={`https://cdn.jsdelivr.net/gh/vearvip/hanzi-imgs@v2/src/images/${charInfo.char}.png`}
                            className={styles.char_img}
                          />
                        </div>
                        <div className={styles.char_btns}>
                          <div className={styles.char_unicode} onClick={() => handleUnicodeClick(charInfo.char)}>
                            U+4E86
                          </div>
                          <div className={styles.char_shuowen} onClick={() => handleShuowenClick(charInfo.char)}>
                            说文
                          </div>
                          <div className={styles.char_kangxi} onClick={() => handleKangxiClick(charInfo.char)}>
                            康熙
                          </div>
                          <div className={styles.char_huizuan} onClick={() => handleHuizuanClick(charInfo.char)}>
                            汇纂
                          </div>
                          <div className={styles.char_handa} onClick={() => handleHandaClick(charInfo.char)}>
                            汉大
                          </div>
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
                  }
                  return (
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
                            phonetic={info.phonetic}
                            explain={info.explain}
                          />
                        ))}
                      </div>
                    </div>
                  );
                }}
              />
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



