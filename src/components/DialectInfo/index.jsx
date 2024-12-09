import React, { useState } from 'react'
import Amap from '../../components/Amap'
import styles from './index.module.less';
import Dialog from '../../components/Dialog'
import { FloatButton, Form, Select } from 'antd';
import useStore from '@/store';
import { JianCheng, YuYan, WeiDu, LuRuRen, LaiYuan, WenJianMing, BanBen, ZiShu, WuZhengZiShu, YinJieShu, BuDaiDiaoYinJieShu, DiTuJiErFenQv, YinDianFenQv, ChenFangFenQv } from '../../utils/constant'
// import ReactDOM from 'react-dom'
import { CloseOutlined } from '@ant-design/icons';
import { useMobile } from '../../utils/hooks';
import { createRoot } from 'react-dom/client';
import { Descriptions } from 'antd';
import { useMemo } from 'react';
import Book from '../Book';


const DialectInfo = (props) => {
  const {
    dialectName,
    color,
    onClose
  } = props
  // console.log('prop--s', props)
  const { store, setStore } = useStore()
  const [open, setOpen] = useState(true)
  const isMobile = useMobile();

  const dialectInfo = useMemo(() => {
    return store.dialectInfos.find(ele => ele[JianCheng] === dialectName)
  }, [dialectName])

  // console.log('000000000', dialectInfo)

  const descriptionItems = [
    { key: '2', label: '地點', children: <div dangerouslySetInnerHTML={{ __html: dialectInfo[YuYan] }} /> },
    { key: '3', label: '緯度', children: <div dangerouslySetInnerHTML={{ __html: dialectInfo[WeiDu] }} /> },
    { key: '4', label: '錄入人', children: <div dangerouslySetInnerHTML={{ __html: dialectInfo[LuRuRen] }} /> },
    { key: '5', label: '來源', children: <div dangerouslySetInnerHTML={{ __html: dialectInfo[LaiYuan] }} /> },
    { key: '6', label: '文件名', children: <div dangerouslySetInnerHTML={{ __html: dialectInfo[WenJianMing] }} /> },
    { key: '7', label: '版本', children: <div dangerouslySetInnerHTML={{ __html: dialectInfo[BanBen] }} /> },
    { key: '8', label: '字数', children: <div dangerouslySetInnerHTML={{ __html: dialectInfo[ZiShu] }} /> },
    { key: '9', label: '口数', children: <div dangerouslySetInnerHTML={{ __html: dialectInfo[WuZhengZiShu] }} /> },
    { key: '10', label: '音節数', children: <div dangerouslySetInnerHTML={{ __html: dialectInfo[YinJieShu] }} /> },
    { key: '11', label: '不带調音節数', children: <div dangerouslySetInnerHTML={{ __html: dialectInfo[BuDaiDiaoYinJieShu] }} /> },
    { key: '12', label: '地圖集二分區', children: <div dangerouslySetInnerHTML={{ __html: dialectInfo[DiTuJiErFenQv] }} /> },
    { key: '13', label: '音典分區', children: <div dangerouslySetInnerHTML={{ __html: dialectInfo[YinDianFenQv] }} /> },
    { key: '14', label: '陳邡分區', children: <div dangerouslySetInnerHTML={{ __html: dialectInfo[ChenFangFenQv] }} /> },
  ]

  const handleClose = () => {
    setOpen(false)
    onClose && onClose()
  }
  return <Dialog
    open={open}
    onClose={handleClose}
    drawerProps={{
      closeIcon: false,
      // styles: {
      //   body: {
      //     padding: 0
      //   }
      // },
      footer: false
    }}
    modalProps={{
      closeIcon: false,
      // width: '90vw',
      // styles: {
      //   content: {
      //     padding: '12px 12px 0 12px',
      //     borderRadius: 10,
      //     overflow: 'hidden'
      //   }
      // },
      // style: {
      //   top: '3vh',
      // },
      footer: false
    }}
  >

    <Descriptions title={<div className="flex-center" style={{
      margin: isMobile ? '-25px 0 -25px 0' : undefined
    }}>
      <Book name={dialectName} color={color} style={{
        transform: isMobile ? 'scale(0.7)' : undefined
      }} />
    </div>} items={descriptionItems} size="small" column={1} />
  </Dialog>
}


let dialogContainer = null;
let root = null;

export const showDialectInfo = (props = {}) => {
  const {
    dialectName,
    color,
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
    <DialectInfo
      dialectName={dialectName}
      color={color}
      onClose={handleClose}
    />
  );
};
