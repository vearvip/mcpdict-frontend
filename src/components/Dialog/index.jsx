import React, { useState, useEffect } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Modal, Drawer, Button } from 'antd';
import { useMobile } from '../../utils/hooks';

/** 
 * @param {Object} props - 组件属性。
 * @param {boolean} props.open - 开关
 * @param {import('react').ReactNode} [props.title] - title
 * @param {import('react').ReactNode} props.children - children
 * @param {Object} [props.drawerProps] - drawerProps
 * @param {Object} [props.modalProps] - modalProps
 * @param {Function} [props.onClose] - 关闭触发时的回调函数。
 * @param {Function} [props.onOk] - 搜索触发时的回调函数。
 */
const Dialog = (props) => {
  const isMobile = useMobile();

  const handleOk = () => {
    props.onOk && props.onOk()
  }
  const handleCancel = () => {
    // console.log('first', 1212)
    props.onClose && props.onClose()
  }

  return (
    <div >

      {
        isMobile
          ? <Drawer
            title={props.title}
            open={props.open}
            placement="top"
            onOk={handleOk}
            onCancel={handleCancel}
            onClose={handleCancel}
            width={'100vw'} 
            style={{ 
              height: '100vh', 
            }}
            footer={ props.open && <div className="flex-center">

              <Button
              style={{
                marginRight: 20
              }}
              onClick={handleCancel}
              >
                取消
              </Button>
              <Button
                type="primary"
              onClick={handleOk}
              >
              确定
              </Button>
            </div>}
            {...(props.drawerProps || {})}
          >
            {props.children}
          </Drawer>
          : <Modal 
            title={props.title}
            open={props.open}
            // okText="确定"
            // cancelText="取消"
            onOk={handleOk}
            onClose={handleCancel}
            onCancel={handleCancel}
            {...(props.modalProps || {})}
          >
            {props.children}
          </Modal>
      }

    </div>
  );
};

export default Dialog;
