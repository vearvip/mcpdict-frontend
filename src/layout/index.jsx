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
import { DiTuJiErFenQv, DiTuJiErPaiXv, JianCheng, ShengDiao, YinDianFenQv, YinDianPaiXv } from '../utils/constant';
import { Badge } from 'antd';
import { useMobile, usePad } from '../utils/hooks';
import { buildDistrictTree, getBackgroundColorFromItem, transformDialectInfosToTree } from '../utils';
import { getLocalPageSettingData } from '../pages/Setting';



// 根据 "地圖集二排序" 排序
function sortByDiTuJiErPaiXv(data) {
  data.sort((a, b) => {
    // 处理 "地圖集二排序" 中的空字符串
    if (!a[DiTuJiErPaiXv] && b[DiTuJiErPaiXv]) return 1;
    if (a[DiTuJiErPaiXv] && !b[DiTuJiErPaiXv]) return -1;
    if (!a[DiTuJiErPaiXv] && !b[DiTuJiErPaiXv]) return 0;

    // 正常比较 "地圖集二排序"
    if (a[DiTuJiErPaiXv] < b[DiTuJiErPaiXv]) return -1;
    if (a[DiTuJiErPaiXv] > b[DiTuJiErPaiXv]) return 1;

    return 0;
  });
  return data
}

// 根据 "音典排序" 排序
function sortByYinDianPaiXv(data) {
  data.sort((a, b) => {
    // 处理 "音典排序" 中的空字符串
    if (!a[YinDianPaiXv] && b[YinDianPaiXv]) return 1;
    if (a[YinDianPaiXv] && !b[YinDianPaiXv]) return -1;
    if (!a[YinDianPaiXv] && !b[YinDianPaiXv]) return 0;

    // 正常比较 "音典排序"
    if (a[YinDianPaiXv] < b[YinDianPaiXv]) return -1;
    if (a[YinDianPaiXv] > b[YinDianPaiXv]) return 1;

    return 0;
  });
  return data
}



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
  const localPageSettingData = getLocalPageSettingData()

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

  const handleGoOsfanMCPDict = () => {
    window.open('https://github.com/osfans/MCPDict');
  };

  const handleGoOpenSource = () => {
    window.open('https://github.com/vearvip/mcpdict-frontend');
  }

  /**
   * 获取方言信息并更新 store。
   */
  const getDialectInfos = async () => {
    try {
      const res = await queryDialectInfos();
      // console.log('setStore', setStore);
      const dialectInfos = (res?.data ?? [])
        .filter(item => getBackgroundColorFromItem(item))
        .map(item => ({
          ...item,
          [ShengDiao]: JSON.parse(item[ShengDiao])
        }))
      // console.log('dialectInfos', dialectInfos)
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
    // console.log('🍓666')
    getDialectInfos().then(({
      dialectInfos,
      dialectNames
    }) => {
      const dialectCateTree = transformDialectInfosToTree(dialectInfos)
      const dialectDistrictTree = buildDistrictTree(dialectInfos)
      const dialectSort = localPageSettingData.partitionMode === DiTuJiErFenQv
        ? sortByDiTuJiErPaiXv(dialectInfos).map(ele => ele[JianCheng])
        : localPageSettingData.partitionMode === YinDianFenQv
          ? sortByYinDianPaiXv(dialectInfos).map(ele => ele[JianCheng])
          : []
      // console.log('dialectSort', dialectSort, localPageSettingData.partitionMode, DiTuJiErFenQv, YinDianPaiXv)
      setStore({
        dialectCateTree: dialectCateTree,
        dialectInfos: dialectInfos,
        dialectNames: dialectNames,
        dialectDistrictTree: dialectDistrictTree,
        dialectSort: dialectSort,
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
          fontFamily: `'Charis SIL', Arial, sans-serif`
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
            本网站由
            <span className={`${styles.btn_link} ${styles.a_tag}`} onClick={handleGoVearPage}>vear</span>
            支持，反馈请
            <span className={styles.a_tag} onClick={handleGoWechatImg}>联系微信</span>
            或者提交Pr：
            <span className={styles.a_tag} onClick={handleGoOpenSource}>Github</span>
            ，数据基于
            <span className={styles.a_tag} onClick={handleGoOsfanMCPDict}>osfans/MCPDict</span>
          </div>
        </div>
      </div>
      <FloatButton.BackTop />
    </ConfigProvider>
  );
};

export default Layout;



