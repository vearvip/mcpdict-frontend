import { Component, createMemo, createSignal, } from 'solid-js';
import { useRoutes, useNavigate, useLocation } from '@solidjs/router';
import { routes } from '../routes';
import styles from "./index.module.less";
import Menu from '@/components/Menu'
import { upyunLogo } from '../utils/asstes';
import { MenuConfig } from '@/types';


const items: MenuConfig[] = [
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
    key: "/long-search"
  },
  {
    label: "字典模式",
    key: "/dict"
  },
  {
    label: "参与注音",
    key: "/join"
  },
];

const Layout: Component = () => {
  const push = useNavigate();
  const location = useLocation();
  const handleMenuClick = (e: MenuConfig) => {
    push(e.key)
  };

  const handleGoVearPage = () => {
    window.open('https://vear.vip')
  }

  const handleUpyunClick = () => {
    window.open('https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral')
  }

  const handleGoWechatImg = () => {
    window.open('https://vkceyugu.cdn.bspapp.com/VKCEYUGU-20c9e8f4-2e86-42ce-9b49-841d84f433a9/9335076b-b6d4-4ac6-af7a-d35e6eeca2ea.webp')
  }


  const Routes = useRoutes(routes);

  return (
    <div class={styles.layout}>
      <div class={`${styles.nav} box`}>
        <Menu dataSource={items} activeKey={location.pathname} onChange={handleMenuClick} />
      </div> 
      <Routes />
      <div class={`${styles.foot} box`}>
        <div>
          本网站由<span class={`${styles.btn_link} ${styles.vear} ${styles.a_tag}`} onClick={handleGoVearPage}>vear</span>支持，反馈请<span class={styles.a_tag} onClick={handleGoWechatImg}>联系微信</span></div>
        <div>
          本网站由<img src={upyunLogo} class={styles.upyun_logo} onClick={handleUpyunClick} />提供CDN加速/云存储服务
        </div>
      </div>
    </div>
  );
};

export default Layout;
