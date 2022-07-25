import { useEffect, useState } from 'react' 
import { AppstoreOutlined, MailOutlined, ProfileOutlined, ReadOutlined, SearchOutlined, SettingOutlined, SmileOutlined } from '@ant-design/icons';
import { Input, MenuProps } from 'antd';
import { Menu, Button } from 'antd'; 
import logo from './imgs/logo.png';
import logoText from './imgs/logo_text.png';
import styles from './index.module.less'

const items: MenuProps['items'] = [
  {
    label: '字音查询',
    key: '1',
    // icon: <SearchOutlined />,
  }, 
  {
    label: '长文注音',
    key: '2',
    // icon: <ProfileOutlined />,
  }, 
  {
    label: '字典模式',
    key: '3',
    // icon: <ReadOutlined />,
  }, 
  {
    label: '参与注音',
    key: '4',
    // icon: <SmileOutlined />,
  }, 
  {
    label: '关于本站',
    key: '5',
    // icon: <MailOutlined />,
  }, 
];

const Index: React.FC = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <div className={styles.index}>
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    <div className={styles.logo_box}>
      <div className={styles.logo_center_box}>
        <img className={styles.logo} src={logo as any} />
        <img className={styles.logo_text} src={logoText as any} /> 
      </div>
      <Input.Group compact>
      <Input size="large" className={styles.input} />
      <Button type="primary">Submit</Button>
    </Input.Group>
    </div>
  </div>;
};

export default Index;