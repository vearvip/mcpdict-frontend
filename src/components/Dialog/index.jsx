import React, { useState, useEffect } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Modal, Drawer, Button, ConfigProvider } from 'antd';
import { usePad } from '../../utils/hooks';
import { themeToken } from '../../layout';

/** 
 * @param {Object} props - 组件属性。
 * @param {boolean} props.open - 开关
 * @param {import('react').ReactNode} [props.title] - title
 * @param {import('react').ReactNode} props.children - children
 * @param {Object} [props.drawerProps] - drawerProps
 * @param {Object} [props.modalProps] - modalProps
 * @param {string} [props.okText] - okText 确定
 * @param {string} [props.cancelText] - cancelText 取消
 * @param {Function} [props.onClose] - close触发时的回调函数。
 * @param {Function} [props.onCancel] - cancel触发时的回调函数。
 * @param {Function} [props.onOk] - 搜索触发时的回调函数。
 */
const Dialog = (props) => {
  const isPad = usePad();

  const handleOk = () => {
    props.onOk && props.onOk()
  }
  const handleCancel = () => {
    // console.log('first', 1212)
    props.onCancel && props.onCancel()
  }
  const handleClose = () => {
    // console.log('first', 1212)
    props.onClose && props.onClose()
  }

  const footer = props.open
    ? <div className="flex-center">

      <Button
        style={{
          marginRight: 20
        }}
        onClick={handleCancel}
      >

        {props.cancelText || '取消'}
      </Button>
      <Button
        type="primary"
        onClick={handleOk}
      >
        {props.okText || '确定'}
      </Button>
    </div>
    : null

  return (
    <div >
      <ConfigProvider
        theme={{
          token: themeToken,
        }}
      >
        {
          isPad
            ? <Drawer
              title={props.title}
              open={props.open}
              placement="top"
              onClose={handleClose}
              width={'100vw'}
              destroyOnClose
              style={{
                height: '80vh',
              }}
              footer={footer}
              {...(props.drawerProps || {})}
            >
              {props.children}
            </Drawer>
            : <Modal
              title={props.title}
              open={props.open}
              destroyOnClose
              onCancel={handleClose}
              footer={footer}
              {...(props.modalProps || {})}
            >
              {props.children}
            </Modal>
        }
      </ConfigProvider>
    </div>
  );
};

export default Dialog;
