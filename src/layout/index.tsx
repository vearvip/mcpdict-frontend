import { Component, createMemo, createSignal, } from 'solid-js';
import { Route, useNavigate, useLocation, RouteSectionProps } from '@solidjs/router';
import styles from "./index.module.less";
import Menu from '@/components/Menu' 
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

const Layout: Component<RouteSectionProps> = (props) => {
  const push = useNavigate();
  const location = useLocation();
  const handleMenuClick = (e: MenuConfig) => {
    push(e.key)
  };

  const handleGoVearPage = () => {
    window.open('https://vear.vip')
  }

 

  const handleGoWechatImg = () => {
    window.open('/')
  }

 

  return (
    <div class={styles.layout}>
      <div class={`${styles.nav} box`}>
        <Menu dataSource={items} activeKey={location.pathname} onChange={handleMenuClick} />
      </div> 
      {props.children}
      <div class={`${styles.foot} box`}>
        <div>
          本网站由<span class={`${styles.btn_link} ${styles.vear} ${styles.a_tag}`} onClick={handleGoVearPage}>vear</span>支持，反馈请<span class={styles.a_tag} onClick={handleGoWechatImg}>联系微信</span></div>
 
      </div>
    </div>
  );
};

export default Layout;
