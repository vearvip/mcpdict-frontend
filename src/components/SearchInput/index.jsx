import React, { useState, useEffect } from 'react';
import styles from "./index.module.less";
import { SettingOutlined } from '@ant-design/icons';
import { usePad } from '../../utils/hooks';
import { Button, ConfigProvider, Flex, Popover, Segmented } from 'antd';

import { Select, Form } from 'antd';
import useStore from '@/store';
import { setLocalFilterData, showFilterDialog } from '../Filter';
import { useSize } from 'ahooks';
import { useRef } from 'react';
import HistoryRecord, { addHisotryRecordList } from '../HistoryRecord';
import { Input } from 'antd';


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
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [form] = Form.useForm();
  const { store, setStore } = useStore()

  const inputContainerRef = useRef(null);
  const isPad = usePad();

  /**
   * 显示设置对话框。
   */
  const handleShowSettingDialog = () => {
    showFilterDialog({
      onOk(filterData) {
        console.log('filterData----',filterData)
        props.onSearch && props.onSearch(value, true)
      },
      onClose() {
        // setLocalFilterData()
      }
    })
  };

  const handleHistoryChange = (historyValue) => {
    setValue(historyValue);
    setPopoverOpen(false);
    props.onSearch && props.onSearch(historyValue);
  }

  const handleSearch = (value) => {
    props.onSearch && props.onSearch(value);
    setPopoverOpen(false);
    addHisotryRecordList(value);
  }

  // 使用 getPopupContainer 将 Popover 内容挂载到同一个容器中
  const getPopupContainer = (triggerNode) => inputContainerRef.current;


  useEffect(() => {
    if (props?.defaultValue !== undefined) {
      setValue(props.defaultValue);
    }
  }, [props.defaultValue]);

  return (
    <div className={styles.input_box} style={props.style || {}}>
      <div className={styles.setting_btn} onClick={handleShowSettingDialog}>
        <SettingOutlined />
      </div>
      <Popover
        placement="bottomLeft"
        trigger={'click'}
        open={popoverOpen}
        arrow={false}
        overlayInnerStyle={{
          padding: 0
        }}
        content={<div className={styles.history_record}>
          <HistoryRecord onChange={handleHistoryChange} />
        </div>}
        getPopupContainer={getPopupContainer}
      >
        <div ref={inputContainerRef} className={styles.input_container}>
          <Input
            autoComplete="off"
            id="search_input"
            onFocus={() => {
              setPopoverOpen(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setPopoverOpen(false);
              }, 240)
            }}
            placeholder="请搜索，单次最多十个汉字"
            size="large"
            value={value}
            className={styles.input}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                handleSearch(value)
              }
            }}
            onClick={() => {
              setPopoverOpen(true);
            }}
            onInput={(event) => {
              setValue(event.target.value);
            }}
          />
        </div>
      </Popover>

      <div className={styles.search_btn} onClick={() => handleSearch(value)}>
        搜 索
      </div>

    </div>
  );
};

export default SearchInput;
