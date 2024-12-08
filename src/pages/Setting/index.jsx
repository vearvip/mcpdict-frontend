import React from 'react'
import styles from './index.module.less'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'; 
import { Menu } from 'antd';

export default () => {
  
const menuItems = [
  {
    key: 'sub1',
    label: '调类',
    // icon: <MailOutlined />, 
  },
 
];
const onClick = (e) => {
  console.log('click ', e);
};
  return (
    <div className={`${styles.setting_box} box`}>
      <div className={styles.setting_content}>
      <div className={styles.setting_left}>
        
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={menuItems}
    />
        </div>
        <div className={styles.setting_right}>
        
      </div>
      </div>
    </div>
  )
}