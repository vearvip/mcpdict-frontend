import React, { useState, useEffect, useMemo } from 'react';
import styles from '../../index.module.less'; // 引入 CSS Module 
import { Collapse } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { useGetState } from 'ahooks';
import AutoFitText from '../../../../components/AutoFitText';
import { parseSplitStr } from '../../../../utils';
import CharList from './components/CharList';

 


/**
 * 左侧盒子组件，用于展示搜索数据。
 */
const LeftBox = (props) => {
  const { searchData } = props;
  const [activeKey, setActiveKey, getActiveKey] = useGetState([])


  // const collapseItems = useMemo(() => {
  //   return (searchData || []).filter(ele => Object.keys(ele?.charInfo ?? {}).length > 0).map((charItem, index) => {
  //     // console.log('charItem.charInfo', charItem.charInfo)
  //     const charInfos = parseDialectData(charItem.charInfo);
  //     // console.log('--------', charInfos)
  //     return {
  //       label: <div className={styles.char}>
  //         {charItem.char}
  //         <div style={{
  //           fontSize: 14,
  //           marginLeft: 5,
  //           marginTop: 12
  //         }}>
  //           {
  //             activeKey.includes(charItem.char)
  //               ? <DownOutlined />
  //               : <UpOutlined />
  //           }
  //         </div>
  //       </div>,
  //       key: charItem.char,
  //       showArrow: false,
  //       children: (
  //         <div key={`char_box_${index}`} className={styles.char_box}>
  //           {charInfos.map((charInfo, infoIndex) => {
  //             // console.log('charInfo', charInfo)
  //             return (
  //               <div key={`char_info_${index}_${infoIndex}`} className={styles.char_info}>
  //                 <AutoFitText
  //                   char={charItem.char}
  //                   dialectName={charInfo.dialectName}
  //                   phonetics={charInfo.infos.map(ele => ele.phonetic)}
  //                 />
  //                 <div>
  //                   {charInfo.infos.map((info, subIndex) => (
  //                     <div key={`info_item_${index}_${infoIndex}_${subIndex}`} className={styles.info_item}>
  //                       <span className={styles.phonetic}>{info.phonetic}</span>
  //                       <span className={styles.explain}>{info.explain}</span>
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>
  //             )
  //           })}
  //         </div>
  //       )
  //     }
  //   })
  // }, [searchData, activeKey])

  const handleCollapseChange = (activeKey) => {
    // console.log('args', args)
    setActiveKey(activeKey)
  }


  useEffect(() => {
    setActiveKey((searchData || []).map(ele => ele.char))

  }, [searchData])


  return (
    <>
      <div className={styles.left_box}>
        <CharList 
          searchData={searchData}
        /> 
        {/* <Collapse
          ghost
          collapsible="header"
          items={collapseItems}
          activeKey={activeKey}
          onChange={handleCollapseChange} /> */}

      </div>
    </>
  );
};

export default LeftBox;



