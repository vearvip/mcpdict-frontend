import { createEffect, createMemo, createSignal } from 'solid-js';
import { useNavigate, useLocation } from '@solidjs/router';
import styles from "./index.module.less";
import Menu from '@/components/Menu'; 
import { queryDialectInfos, queryGeo } from '@/services';
import { setStore } from '@/store';

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
  const push = useNavigate();
  const location = useLocation();

  /**
   * 处理菜单点击事件，跳转到对应路由。 
   */
  const handleMenuClick = (e) => {
    push(e.key);
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
    alert('微信号：vear-vip');
  };

  /**
   * 获取方言信息并更新 store。
   */
  const fetchGeo = async () => {
    try {
      const res = await queryDialectInfos();
      console.log('dialectInfos', res);
      setStore({ dialectInfos: res?.data ?? {} });
    } catch (error) {
      console.error('Failed to fetch dialect infos:', error);
    }
  };

  createEffect(() => {
    fetchGeo();
  });

  return (
    <div class={styles.layout}>
      <div class={`${styles.nav} box`}>
        <Menu dataSource={items} activeKey={location.pathname} onChange={handleMenuClick} />
      </div>
      {props.children}
      <div class={`${styles.foot} box`}>
        <div>
          本网站由<span class={`${styles.btn_link} ${styles.vear} ${styles.a_tag}`} onClick={handleGoVearPage}>vear</span>支持，反馈请<span class={styles.a_tag} onClick={handleGoWechatImg}>联系微信</span>
        </div>
      </div>
    </div>
  );
};

export default Layout;