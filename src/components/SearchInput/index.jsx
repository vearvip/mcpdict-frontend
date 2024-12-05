import React, { useState, useEffect } from 'react';
import styles from "./index.module.less";
import { SettingOutlined } from '@ant-design/icons';
import { useMobile } from '../../utils/hooks';
import Dialog from '../Dialog';

import { Select, Form } from 'antd';
import useStore from '@/store';
import { JC } from '../../utils/constant';


/*/workspaces/dialect-dict-frontend/src/components/Filter*
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


  // 注意：selectedDialects 和 setSelectFangYanId 的初始化值为空对象或空数组，
  // 具体取决于您的应用逻辑。这里暂时留空。
  const [selectedDialects, setSelectFangYanId] = useState([]);

  /**
   * 显示设置对话框。
   */
  const handleShowSettingDialog = () => {
    setOpen(true);
    setTimeout(() => {
      const filterData = JSON.parse(localStorage.getItem('filterData') || '{}')
      console.log('filterData', filterData)
      form.setFieldsValue(filterData)
    }, 0)
  };

  const handleModalOk = () => {
    const filterData = form.getFieldsValue()
    localStorage.setItem('filterData', JSON.stringify(filterData))
    console.log('filterData', filterData)
    setOpen(false)
    props.onSearch(value, true)
  }
  const handleModalCancel = () => {
    setOpen(false)
    
  }

  useEffect(() => {
    // 模拟异步数据获取操作（注释掉的代码）
    // const fetchData = async () => {
    //   const data = await queryFangYans();
    //   setLangs(data.langs);
    //   console.log('data', data);
    //   setFangYans(data);
    // };
    // fetchData();
    
  }, []);

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
      <Dialog
        title="筛选"
        open={open}
        onOk={handleModalOk}
        onClose={handleModalCancel}
      >
        <Form form={form}>
          <Form.Item name="dialectName" label="选择语言" >
            <Select
              showSearch
              allowClear
              options={(store?.dialectInfos ?? []).map(ele => {
                return {
                  label: ele[JC],
                  value: ele[JC],
                }
              })}
            />
          </Form.Item>
        </Form>
      </Dialog>

    </div>
  );
};

export default SearchInput;
