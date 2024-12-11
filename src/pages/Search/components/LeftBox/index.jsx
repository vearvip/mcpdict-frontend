import React, { useState, useEffect, useMemo } from 'react';
import styles from '../../index.module.less'; // 引入 CSS Module 
import { Collapse } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import AutoFitText from '../../../../components/AutoFitText';
import { parseSplitStr } from '../../../../utils';
import CharList from './components/CharList';

 


/**
 * 左侧盒子组件，用于展示搜索数据。
 */
const LeftBox = (props) => {
  const { searchData } = props;
   
  return (
    <>
      <div className={styles.left_box}>
        <CharList 
          searchData={searchData}
        /> 

      </div>
    </>
  );
};

export default LeftBox;



