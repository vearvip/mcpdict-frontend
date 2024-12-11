import React, { useState, useMemo, useEffect } from 'react'
import styles from './index.module.less' 
import { Button, Menu } from 'antd';
import AutoFitText from '@/components/AutoFitText';
import NoData from '@/components/NoData'; 
import { groupVariants, parseSplitStr } from '@/utils';
import { usePad } from '@/utils/hooks';
import VirtualScroll from "react-dynamic-virtual-scroll"; 


export default ({
  searchData
}) => {
  const isPad = usePad()
  const [selectedCharItem, setSelectedCharItem] = useState()
  const [selectedCharInfos, setSelectedCharInfos] = useState()
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


  useEffect(() => {
    setSelectedCharItem(searchData[0])
    setSelectedCharInfos(parseDialectData(searchData[0].charInfo))

  }, [
    searchData
  ])


  return (
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
                setSelectedCharInfos(parseDialectData(charItem.charInfo))
              }}
            >
              <div className={styles.char_label}>
                <div className={styles.char_label_main}>
                  {charItem.char}
                </div>
                {
                  charItem.char !== charItem.originChar
                    ? <div className={styles.char_label_extra}>
                      ({charItem.originChar})
                    </div> : null
                }
              </div>
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
                return (
                  <div key={`char_info_${infoIndex}`} className={styles.char_info}>
                    <AutoFitText
                      char={selectedCharItem?.char}
                      dialectName={charInfo.dialectName}
                      phonetics={charInfo.infos.map(ele => ele.phonetic)}
                    />
                    <div>
                      {charInfo.infos.map((info, subIndex) => (
                        <div key={`info_item_${infoIndex}_${subIndex}`} className={styles.info_item}>
                          <span className={styles.phonetic}>{info.phonetic}</span>
                          <span className={styles.explain}>{info.explain}</span>
                        </div>
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
  )
}