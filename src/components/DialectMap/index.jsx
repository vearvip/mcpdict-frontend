import React, { useState } from 'react'
import Amap from '../../components/Amap'
import styles from './index.module.less';
import Dialog from '../../components/Dialog'
import { FloatButton, Form, Select } from 'antd';
import useStore from '@/store';
import { JianCheng } from '../../utils/constant'
// import ReactDOM from 'react-dom'
import { CloseOutlined } from '@ant-design/icons';
import { usePad } from '../../utils/hooks';
import { createRoot } from 'react-dom/client';


const DialectMap = ({
  onClose
}) => {
  const [form] = Form.useForm();
  const { store, setStore } = useStore()
  const [open, setOpen] = useState(true)
  const isPad = usePad();

  const handleClose = () => {
    setOpen(false)
    onClose && onClose()
  }
  return <Dialog
    open={open}
    onClose={handleClose}
    drawerProps={{
      closeIcon: false,
      styles: {
        body: {
          padding: 0
        }
      },
      footer: false
    }}
    modalProps={{
      closeIcon: false,
      width: '90vw',
      styles: { 
        content: {
          padding: '12px 12px 0 12px', 
          borderRadius: 10,
          overflow: 'hidden'
        }
      }, 
      style: { 
        top: '3vh',
      },
      footer: false
    }}
  >
    {
      isPad && <FloatButton
      icon={<CloseOutlined />}
      type="primary"
      onClick={handleClose} />
    }
    
    <Amap
      style={{
        width: '100%',
        // height: '600px',
        // height: 'calc(100vh - 60px - 80px - 40px)'
        height: isPad ? '100vh' : '90vh',
        borderRadius: 10,
        overflow: 'hidden'

      }}
    />

  </Dialog>
}

 
let dialogContainer = null;
let root = null;

export const showDialectMap = (props = {}) => {
  const {
    onClose
  } = props;

  // 如果对话框容器已经存在，则不再创建新的容器
  if (!dialogContainer) {
    dialogContainer = document.createElement('div');
    document.body.appendChild(dialogContainer);
    root = createRoot(dialogContainer); // 创建根实例
  }

  // 定义关闭对话框的方法
  const handleClose = (...args) => {
    // 移除DOM中的容器元素
    setTimeout(() => {
      if (dialogContainer.parentNode) {
        dialogContainer.parentNode.removeChild(dialogContainer);
        dialogContainer = null; // 清空容器引用
        root = null; // 清空根实例引用
      }
      // 调用传递的onClose回调，如果有的话
      onClose && onClose.call(this, ...args);
    }, 500); // 假设这里的500ms是为了等待动画完成
  };

  // 渲染对话框组件到根中
  root.render(
    <DialectMap
      onClose={handleClose}
    />
  );
};
