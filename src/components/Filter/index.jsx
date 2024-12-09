import React, { useState, useEffect } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { useMobile } from '../../utils/hooks';
import { createRoot } from 'react-dom/client';
import Dialog from '../Dialog';

import { Select, Form, Radio } from 'antd';
import useStore from '@/store';



/**
 * 搜索输入组件，用于处理用户搜索输入和设置对话框。
 *
 * @param {Object} props - 组件属性。 
 * @param {boolean} [props.tmpMode] - 临时模式 
 * @param {Function} [props.onOk] - ok时的回调函数。
 * @param {Function} [props.onClose] - close时的回调函数。
 */
const FilterDialog = (props) => {
  const {
    tmpMode, 
    onOk,
    onClose
  } = props;
  const filterDefaultData =   {
    filterMode: 'lang',
    dialectName: undefined,
  }
  const [open, setOpen] = useState(true);
  const [form] = Form.useForm();
  const { store, setStore } = useStore()
  const handleDialogOk = () => {
    const filterData = form.getFieldsValue()
   
    localStorage.setItem('filterData', JSON.stringify(filterData))
    // console.log('filterData', filterData)
    setOpen(false)
    onOk && onOk(filterData)
  }
  const handleDialogCancel = () => {
    // form.resetFields()
    // console.log('filterDefaultData', filterDefaultData)
    form.setFieldsValue(filterDefaultData)
  }
  const handleDialogClose = () => {
    setOpen(false)
    onClose && onClose()

  }

  useEffect(() => {
    setTimeout(() => {
      const filterDataLocalStr = localStorage.getItem('filterData')
      const filterData = filterDataLocalStr ? JSON.parse(filterDataLocalStr) : filterDefaultData
      for (const key in filterDefaultData) {
        const element = filterDefaultData[key];
        if (!filterData[key]) {
          filterData[key] = element
        }
      }
      // console.log('11filterData', filterData)
      form.setFieldsValue(filterData)
    }, 0)
  }, [])

  return (

    <Dialog
      title="筛选"
      open={open}
      cancelText="清空"
      onOk={handleDialogOk}
      onCancel={handleDialogCancel}
      onClose={handleDialogClose}
    >
      <Form form={form}>

        <Form.Item name="filterMode" label={false} >
          <Radio.Group
            block
            options={[
              { label: '选择语言', value: 'lang' },
              { label: '自选', value: 'custom', disabled: tmpMode || true },
              { label: '分区', value: 'area', disabled: tmpMode || true },
            ]}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item name="dialectName" label={false} >
          <Select
            showSearch
            allowClear
            options={(store?.dialectNames ?? []).map(name => {
              return {
                label: name,
                value: name,
              }
            })}
          />
        </Form.Item>
      </Form>
    </Dialog>
  );
};

export default FilterDialog;


let dialogContainer = null;
let root = null;
export const showFilterDialog = (props = {}) => {
  const {
    tmpMode,
    onClose,
    onOk, 
  } = props;

  // 如果对话框容器已经存在，则不再创建新的容器
  if (!dialogContainer) {
    dialogContainer = document.createElement('div');
    document.body.appendChild(dialogContainer);
    root = createRoot(dialogContainer); // 创建根实例
  }
  const remove = (callback) => {
    console.log('dialogContainer', dialogContainer)
    setTimeout(() => {
      if (dialogContainer.parentNode) {
        dialogContainer.parentNode.removeChild(dialogContainer);
        dialogContainer = null; // 清空容器引用
        root = null; // 清空根实例引用
      }
      callback()
    }, 380); // 这里的500ms是为了等待动画完成
  }

  // 定义关闭对话框的方法
  const handleClose = (...args) => {
    remove(() => {
      // 调用传递的onClose回调，如果有的话
      onClose && onClose.call(this, ...args);
    })
  };
  // 定义关闭对话框的方法
  const handleOk = (...args) => {
    remove(() => {
      // 调用传递的onOk回调，如果有的话
      onOk && onOk.call(this, ...args);
    })
  };

  // 渲染对话框组件到根中
  root.render(
    <FilterDialog
      tmpMode={tmpMode} 
      onOk={handleOk}
      onClose={handleClose}
    />
  );
};