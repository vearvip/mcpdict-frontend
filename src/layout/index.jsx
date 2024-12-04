import { useEffect, useState } from 'react';
import styles from "./index.module.less";
import Menu from '@/components/Menu';
import { queryDialectInfos, queryGeo } from '@/services';
import useStore from '@/store';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router";
import { routes } from '@/routes'
import { message } from 'antd';

/**
 * 菜单项配置数组，定义了菜单的各个选项。 
 */
const items = [
  {
    label: "首页",
    key: "/"
  },
  {
    label: "字音查询",
    key: "/search"
  },
  {
    label: "长文注音",
    key: "/long-search",
    disabled: true,
  },
  // {
  //   label: "字典模式",
  //   key: "/dict"
  // },
  // {
  //   label: "参与注音",
  //   key: "/join"
  // },
];

/**
 * 布局组件，用于包裹页面内容并提供导航和页脚。 
 */
const Layout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { store, setStore} =useStore()
  const [messageApi, contextHolder] = message.useMessage();

  /**
   * 处理菜单点击事件，跳转到对应路由。 
   */
  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  /**
   * 打开 Vear 页面。
   */
  const handleGoVearPage = () => {
    window.open('https://vear.vip');
  };

  /**
   * 显示微信号信息。
   */
  const handleGoWechatImg = () => {
    messageApi.info('微信号：vear-vip'); 
  };

  /**
   * 获取方言信息并更新 store。
   */
  const getDialectInfos = async () => {
    try {
      const res = await queryDialectInfos();
      // console.log('setStore', setStore);
      setStore({ dialectInfos: res?.data ?? {} });
    } catch (error) {
      console.error('Failed to fetch dialect infos:', error);
    }
  };

  useEffect(() => {
    getDialectInfos();
  }, []);

  return (
    <div className={styles.layout}>
      {contextHolder}
      <div className={`${styles.nav} box`}> 
        <Menu dataSource={items} activeKey={location.pathname} onChange={handleMenuClick}/>
      </div>
        <Routes>
          {
            routes.map((item, index) => {
              return <Route key={index} path={item.path} element={<item.component />} />
            })
          }
        </Routes> 

      <div className={`${styles.foot} box`}>
        <div>
          本网站由<span className={`${styles.btn_link} ${styles.vear} ${styles.a_tag}`} onClick={handleGoVearPage}>vear</span>支持，反馈请<span className={styles.a_tag} onClick={handleGoWechatImg}>联系微信</span>
        </div>
      </div>
    </div>
  );
};

export default Layout;



