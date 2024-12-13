import React, { useState, useEffect, useMemo } from 'react';
import styles from '../../index.module.less'; // 引入 CSS Module   
import CharList from './components/CharList';
import { getLocalPageSettingData } from '../../../Setting';
import CharTable from './components/CharTable';




/**
 * 左侧盒子组件，用于展示搜索数据。
 */
const LeftBox = (props) => {
  const { searchData } = props;
  const pageSettingData = getLocalPageSettingData()

  return <div className={styles.left_box} style={{
    maxWidth: pageSettingData.searchPageFormat === 'table' ? '960px' : undefined
  }}>
    {
      pageSettingData.searchPageFormat === 'table'
        ? <CharTable searchData={searchData} />
        : <CharList searchData={searchData} />
    }
  </div>

};

export default LeftBox;



