import React, { useState, useEffect, useImperativeHandle } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { usePad } from '../../utils/hooks';
import { createRoot } from 'react-dom/client';
import Dialog from '../Dialog';

import { Select, Form, Radio, Button } from 'antd';
import { TreeSelect } from 'antd';
import useStore from '@/store';
import { useRef } from 'react';

const filterDefaultData = {
  filterMode: 'lang',
  dialectName: undefined,
  dialectArea: undefined,
  dialectCustoms: undefined,
}

export const getLocalFilterData = () => {
  try {
    const filterDataLocalStr = localStorage.getItem('filterData')
    const filterData = (filterDataLocalStr && filterDataLocalStr != 'undefined')
      ? JSON.parse(filterDataLocalStr)
      : filterDefaultData
    return filterData
  } catch (error) {
    console.error('获取筛选本地存储值失败：', error)
    return filterDefaultData
  }
}

export const setLocalFilterData = (filterData = filterDefaultData) => {
  try {
    if (filterData) {
      localStorage.setItem('filterData', JSON.stringify(filterData))
    }
  } catch (error) {
    console.error('设置筛选本地存储值失败：', error)
  }
}




export const Filter = React.forwardRef(
  /**
   * 搜索输入组件，用于处理用户搜索输入和设置对话框。
   *
   * @param {Object} props - 组件属性。 
   * @param {boolean} [props.tmpMode] - 临时模式  
   * @param {Function} [props.onChange] - 临时模式  
   */
  (props, ref) => {
    const {
      tmpMode,
      onChange,
    } = props;


    const [form] = Form.useForm();
    const filterMode = Form.useWatch('filterMode', form);
    const { store, setStore } = useStore()

    useImperativeHandle(ref, () => {
      // 需要将暴露的接口返回出去
      return {
        reset: resetFormData,
        getValues: getAllFormData,
      };
    });

    const handleFormChange = (changedValues, allValues) => {
      // console.log('changedValues, allValues', changedValues, allValues)
      onChange && onChange(allValues)
    }

    const getAllFormData = () => {
      return form.getFieldsValue()
    }

    const resetFormData = () => {
      form.setFieldsValue(filterDefaultData)

    }


    useEffect(() => {
      setTimeout(() => {
        const filterData = getLocalFilterData()
        for (const key in filterDefaultData) {
          const defaultFieldVal = filterDefaultData[key];
          if (!filterData[key]) {
            filterData[key] = defaultFieldVal
          }
        }
        if (tmpMode) {
          filterData.filterMode = 'lang'
        }
        // console.log('🍉', filterData)
        form.setFieldsValue(filterData)
      }, 0)
    }, [])

    return (
      <Form form={form} onValuesChange={handleFormChange}>
        <Form.Item name="filterMode" >
          <Radio.Group
            block
            options={[
              { label: '选择语言', value: 'lang' },
              { label: '自选', value: 'custom', disabled: tmpMode },
              { label: '分区', value: 'area', disabled: tmpMode },
            ]}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item name="dialectName" hidden={filterMode !== 'lang'}>
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
        <Form.Item name="dialectCustoms" hidden={filterMode !== 'custom'}>
          <Select
            showSearch
            allowClear
            mode="multiple"
            options={(store?.dialectNames ?? []).map(name => {
              return {
                label: name,
                value: name,
              }
            })}
          />
        </Form.Item>
        <Form.Item name="dialectArea" hidden={filterMode !== 'area'}>
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            // dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} 
            allowClear
            treeDefaultExpandAll
            treeData={(store?.dialectCateTree ?? [])}
          // onPopupScroll={onPopupScroll}
          />
        </Form.Item>
      </Form>
    );
  }
);


/**
 * 搜索输入组件Dialog，用于处理用户搜索输入和设置对话框。
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
  const [open, setOpen] = useState(true);
  // const [formData, setFormData] = useState()
  const formRef = useRef()

  const handleDialogOk = () => {
    const formData = formRef.current.getValues()
    // console.log('🍓', formData, formRef.current.getValues())
    setLocalFilterData(formData)
    setOpen(false)
    onOk && onOk(formData)
  }

  const handleDialogClose = () => {
    setOpen(false)
    onClose && onClose()

  }

  const handleDialogCancel = () => {
    formRef.current.reset()
  }

  const handleFilterChange = allValues => {
    // setFormData(allValues)
  }


  return (

    <Dialog
      title="筛选"
      open={open}
      cancelText="重置"
      onOk={handleDialogOk}
      onCancel={handleDialogCancel}
      onClose={handleDialogClose}
    >
      <Filter
        ref={formRef}
        tmpMode={tmpMode}
        onChange={handleFilterChange}
      />
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
    // console.log('dialogContainer', dialogContainer)
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