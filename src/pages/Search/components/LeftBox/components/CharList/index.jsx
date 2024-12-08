import React from 'react'
import styles from './index.module.less'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import AutoFitText from '../../../../../../components/AutoFitText';
import { Tabs } from 'antd';
import { groupVariants, parseSplitStr } from '../../../../../../utils';
import { useMobile } from '../../../../../../utils/hooks';
import VirtualScroll from "react-dynamic-virtual-scroll";


export default ({
  searchData
}) => {
  const isMobile = useMobile()
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



  const menuItems = (searchData || [])
    .filter(ele => Object.keys(ele?.charInfo ?? {}).length > 0)
    .map((charItem, index) => {
      const charInfos = parseDialectData(charItem.charInfo);
      console.log('charInfos', charInfos)
      return {
        label: <div className={styles.char_label}>
          <div className={styles.char_label_main}>
            {charItem.char}
          </div>
          {
            charItem.char !== charItem.originChar
              ? <div className={styles.char_label_extra}>
                ({charItem.originChar})
              </div> : null
          }
        </div>,
        key: charItem.char,
        showArrow: false,
        children: <div style={{
          // flex: 1,
          // width:'100%',
          padding: isMobile ? '0 0 15px 0' : '20px 0',
          // border: '1px solid red',
          height: isMobile
            ? 'calc(100vh - 60px - 80px - 40px - 40px - 30px - 55px)'
            : 'calc(100vh - 60px - 80px - 40px - 40px - 40px)',
          overflow: 'auto'
        }}>
          {charInfos.map((charInfo, infoIndex) => {
            // console.log('charInfo', charInfo)
            return (
              <div key={`char_info_${index}_${infoIndex}`} className={styles.char_info}>
                <AutoFitText
                  char={charItem.char}
                  dialectName={charInfo.dialectName}
                  phonetics={charInfo.infos.map(ele => ele.phonetic)}
                />
                <div>
                  {charInfo.infos.map((info, subIndex) => (
                    <div key={`info_item_${index}_${infoIndex}_${subIndex}`} className={styles.info_item}>
                      <span className={styles.phonetic}>{info.phonetic}</span>
                      <span className={styles.explain}>{info.explain}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>,
        children: <VirtualScroll 
          style={{ 
            padding: isMobile ? '0 0 15px 0' : '20px 0', 
            height: isMobile
              ? 'calc(100vh - 60px - 80px - 40px - 40px - 30px - 55px)'
              : 'calc(100vh - 60px - 80px - 40px - 40px - 40px)',
            overflow: 'auto'
          }}
          minItemHeight={28}
          totalLength={charInfos.length}
          renderItem={(infoIndex) => {
            const charInfo = charInfos[infoIndex];
            return (
              <div key={`char_info_${index}_${infoIndex}`} className={styles.char_info}>
                <AutoFitText
                  char={charItem.char}
                  dialectName={charInfo.dialectName}
                  phonetics={charInfo.infos.map(ele => ele.phonetic)}
                />
                <div>
                  {charInfo.infos.map((info, subIndex) => (
                    <div key={`info_item_${index}_${infoIndex}_${subIndex}`} className={styles.info_item}>
                      <span className={styles.phonetic}>{info.phonetic}</span>
                      <span className={styles.explain}>{info.explain}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }}
        />
      }
    })

  const onClick = (e) => {
    console.log('click ', e);
  };
  return (
    <div
      className={`${styles.char_list_box}`}
    >
      <Tabs
        tabPosition={isMobile ? 'top' : 'left'}
        destroyInactiveTabPane
        style={{
          width: '100%',
          height: isMobile
            ? 'calc(100vh - 60px - 80px - 40px - 40px)'
            : 'calc(100vh - 60px - 80px - 40px - 40px)',
          // border: '1px solid blue',
          boxSizing: 'border-box',
          overflow: 'hidden',
          margin: '0',
          paddingLeft: isMobile ? '20px' : undefined,
        }}
        items={menuItems}
      />
      {/* <div className={styles.char_list_box_left}>

      <Tabs
        tabPosition="left"
        // style={{ height: 220 }}
        items={menuItems}
      />
      </div> */}
      {/* <div className={styles.char_list_box_right}>
        {
          (items || []).filter(ele => Object.keys(ele?.charInfo ?? {}).length > 0).map((charItem, index) => {
            // console.log('charItem.charInfo', charItem.charInfo)
            const charInfos = parseDialectData(charItem.charInfo);
            // console.log('--------', charInfos)
            return {
              label: <div className={styles.char}>
                {charItem.char}
                <div style={{
                  fontSize: 14,
                  marginLeft: 5,
                  marginTop: 12
                }}>
                  {
                    activeKey.includes(charItem.char)
                      ? <DownOutlined />
                      : <UpOutlined />
                  }
                </div>
              </div>,
              key: charItem.char,
              showArrow: false,
              children: (
                <div key={`char_box_${index}`} className={styles.char_box}>
                  {charInfos.map((charInfo, infoIndex) => {
                    // console.log('charInfo', charInfo)
                    return (
                      <div key={`char_info_${index}_${infoIndex}`} className={styles.char_info}>
                        <AutoFitText
                          char={charItem.char}
                          dialectName={charInfo.dialectName}
                          phonetics={charInfo.infos.map(ele => ele.phonetic)}
                        />
                        <div>
                          {charInfo.infos.map((info, subIndex) => (
                            <div key={`info_item_${index}_${infoIndex}_${subIndex}`} className={styles.info_item}>
                              <span className={styles.phonetic}>{info.phonetic}</span>
                              <span className={styles.explain}>{info.explain}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            }
          })
        }
      </div> */}
    </div>
  )
}