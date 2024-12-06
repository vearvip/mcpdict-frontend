import React, { useState, useEffect } from 'react';
import styles from "./index.module.less";
import { SettingOutlined } from '@ant-design/icons';
import { useMobile } from '../../utils/hooks';
import Dialog from '../Dialog';

import { Select, Form } from 'antd';
import useStore from '@/store';
import { JC, YDYS } from '../../utils/constant';
import { showFilterDialog } from '../Filter';


/**
 * 搜索输入组件，用于处理用户搜索输入和设置对话框。
 *
 * @param {Object} props - 组件属性。
 * @param {React.CSSProperties} [props.style] - 自定义样式。
 * @param {string} [props.defaultValue] - 默认值。
 * @param {Function} [props.onSearch] - 搜索触发时的回调函数。
 */
const SearchInput = (props) => {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { store, setStore } = useStore()
  const isMobile = useMobile();
 
  /**
   * 显示设置对话框。
   */
  const handleShowSettingDialog = () => { 
    showFilterDialog({
      onOk(filterData) {
        console.log('filterData----',filterData)
        props.onSearch(value, true)
      },
      onClose() {

      }
    })
  };
  

  useEffect(() => {
    if (props?.defaultValue !== undefined) {
      setValue(props.defaultValue);
    }
  }, [props.defaultValue]);

  return (
    <div className={styles.input_box} style={props.style || {}}>
      <div className={styles.setting_btn} onClick={handleShowSettingDialog}>
        <SettingOutlined />
        {/* <img src={settingPng} className={styles.setting_icon} /> */}
      </div>
      <input
        placeholder="请搜索，单次最多十个汉字"
        size="large"
        value={value}
        className={styles.input}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            if (props.onSearch) props.onSearch(value);
          }
        }}
        onInput={(event) => {
          setValue(event.target.value);
        }}
      />
      <div className={styles.search_btn} onClick={() => {
        if (props.onSearch) props.onSearch(value);
      }}>
        搜 索
      </div> 

    </div>
  );
};

export default SearchInput;
