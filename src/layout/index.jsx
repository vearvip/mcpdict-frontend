import { useEffect, useState } from 'react';
import styles from "./index.module.less";
import Menu from '@/components/Menu';
import { queryDialectInfos, queryDialectGeo } from '@/services';
import useStore from '@/store';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router";
import { routes } from '@/routes'
import { FloatButton, message } from 'antd';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { JianCheng } from '../utils/constant';
import { Badge } from 'antd';
import { useMobile, usePad } from '../utils/hooks';
import { getBackgroundColorFromItem, transformDialectInfosToTree } from '../utils';
import { getLocalPageSettingData } from '../pages/Setting';





/**
 * 布局组件，用于包裹页面内容并提供导航和页脚。 
 */
const Layout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { store, setStore } = useStore()
  const isPad = usePad()
  const isMobile = useMobile()
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
      const dialectInfos = (res?.data ?? []).filter(item => getBackgroundColorFromItem(item)) 
      return {
        dialectInfos: dialectInfos,
        dialectNames: dialectInfos.map(ele => ele[JianCheng])
      }
    } catch (error) {
      console.error('Failed to fetch dialect infos:', error);
      return false
    }
  };

  /**
   * 获取方言Geo信息并更新 store。
   */
  const getDialectGeo = async (dialectInfos) => {
    if (!dialectInfos) return
    try {
      const res = await queryDialectGeo();
      setStore({
        geo: res.data,
      });
    } catch (error) {
      console.error('Failed to fetch dialect infos:', error);
    }
  };

  useEffect(() => {
    getDialectInfos().then(({
      dialectInfos,
      dialectNames
    }) => {
      const dialectCateTree = transformDialectInfosToTree(dialectInfos) 
      setStore({
        dialectCateTree: dialectCateTree,
        dialectInfos: dialectInfos,
        dialectNames: dialectNames,
      });
      window.dialectInfosWasReady = true
    })
    // getDialectGeo()
  }, []);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: '#3273dc',
          colorLink: '#3273dc',
          // colorBgBase: '#3273dc',
          borderRadius: 4,
          // fontFamily: `'Charis SIL', 'WenJinMinchoP0', 'WenJinMinchoP2', 'WenJinMinchoP3', Arial, sans-serif`
        },
      }}
    >
      <div className={styles.layout}>
        {contextHolder}
        <div className={`${styles.nav} box`}>
          <Menu
            dataSource={routes.filter(ele => !ele.hidden).map(ele => {
              return {
                label: ele.beta
                  ? <Badge
                    size={isMobile ? 'small' : 'default'}
                    count="beta"
                    style={{ backgroundColor: '#52c41a' }}
                    offset={isMobile ? [27, 7] : [5, -10]}
                  >
                    {ele.title}
                  </Badge>
                  : ele.title,
                key: ele.path,
                disabled: ele.disabled,
              }
            })}
            activeKey={location.pathname}
            onChange={handleMenuClick}
          />
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
      <FloatButton.BackTop />
    </ConfigProvider>
  );
};

export default Layout;



