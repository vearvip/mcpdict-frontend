import { useEffect, useState } from 'react';
import styles from "./index.module.less";
import Menu from '@/components/Menu';
import { queryDialectInfos, queryDialectGeo } from '@/services';
import useStore from '@/store';
import { Routes, Route, useNavigate, useLocation } from "react-router";
import { routes } from '@/routes'
import { Button, FloatButton, message } from 'antd';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { BuChongYueDu, BuDaiDiaoYinJieShu, CanKaoWenXian, Cun, DiTuJiErFenQv, DiTuJiErPaiXv, DiTuJiErYanSe, JianCheng, JingWeiDu, Sheng, ShengDiao, Shi, WeiHuRen, WuZhengZiShu, Xian, YinDianFenQv, YinDianPaiXv, YinDianYanSe, YinJieShu, YinXiShuoMing, YuYan, Zhen, ZiRanCun, ZiShu } from '../utils/constant';
import { Badge, notification } from 'antd';
import { useMobile, usePad } from '../utils/hooks';
import { buildDistrictTree, getBackgroundColorFromItem, transformDialectInfosToTree } from '../utils';
import { getLocalPageSettingData } from '../pages/Setting';
import { SmileOutlined } from '@ant-design/icons';
import MiniAppQRCode from '../assets/webp/miniapp_qrcode.webp';



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



export const themeToken = {
  colorPrimary: '#3273dc',
  colorLink: '#3273dc',
  borderRadius: 4,
  fontFamily: `'Charis SIL', Arial, sans-serif`
}


/**
 * 布局组件，用于包裹页面内容并提供导航和页脚。 
 */
const Layout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { store, setStore } = useStore()
  const isMobile = useMobile()
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
    // messageApi.info('微信号：vear-vip');
    window.open('https://cdn.jsdelivr.net/gh/vearvip/cdn@v0.0.14/img/qrcode_wechat.png')
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
      /**
       * 格式化颜色
       * @param {string} colorStr 
       * @returns {string}
       */
      const parseColor = colorStr => {
        if (!colorStr) return colorStr
        return colorStr.replaceAll(',#FFFFFF', '')
      }
      const dialectInfos = (res?.data ?? [])
        .map(item => {
          return {
            [YuYan]: item[0], // [0] 语言 
            [JianCheng]: item[1], // [1] 简称
            [JingWeiDu]: item[2], // [2] 经纬度
            [DiTuJiErFenQv]: item[3], // [3] 地图集二分区
            [DiTuJiErYanSe]: parseColor(item[4]), // [4] 地图集二颜色
            [DiTuJiErPaiXv]: item[5], // [5] 地图集二排序
            [YinDianFenQv]: item[6], // [6] 音典分区
            [YinDianYanSe]: parseColor(item[7]), // [7] 音典颜色
            [YinDianPaiXv]: item[8], // [8] 音典排序
            [ShengDiao]: item[9], // [9] 声调
            [Sheng]: item[10], // [10] 声
            [Shi]: item[11], // [11] 市
            [Xian]: item[12], // [12] 县
            [Zhen]: item[13], // [13] 镇
            [Cun]: item[14], // [14] 村
            [ZiRanCun]: item[15], // [15] 自然村
            [ZiShu]: item[16], // [16] 字數
            [WuZhengZiShu]: item[17], // [17] □數
            [YinJieShu]: item[18], // [18] 音節數
            [BuDaiDiaoYinJieShu]: item[19], // [19] 不帶調音節數
            [WeiHuRen]: item[20], // [20] 維護人
            [CanKaoWenXian]: item[21], // [21] 參考文獻
            [BuChongYueDu]: item[22], // [22] 補充閲讀
            [YinXiShuoMing]: item[23], // [23] 音系說明
          }
        })
        .filter(item => getBackgroundColorFromItem(item))
      console.log('dialectInfos', dialectInfos)
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
    if (localStorage.getItem('mcpdict-miniapp-notice') !== 'yes') {
      notification.open({
        // placement: 'top',
        message: '小程序来了，尝尝鲜吧！',
        description: <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <img src={MiniAppQRCode} alt="小程序二维码" style={{ width: 120, height: 120, marginTop: 20 }} />
        </div>,
        // icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        duration: false,
      });
      localStorage.setItem('mcpdict-miniapp-notice', 'yes')
    }
    if (localStorage.getItem('dialects.yzup.top-notice') !== 'yes') {
      notification.open({
        // placement: 'top',
        message: '推荐一位朋友制作的网站「方音圖鑑」！',
        description: <div style={{
          // display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center',
        }}>
          <div>「<a href="https://dialects.yzup.top" target="_blank">方音圖鑑</a>」是一個專注於中古地位分析、方言比較、地理語言學的線上工具，致力於以清晰、互動的方式呈現各方言點聲韻層次及音位分合。</div>
          <div>功能十分强大，强烈推荐大家前往体验！</div>
          <a href="https://dialects.yzup.top" target="_blank">
            <img src="https://gw.alicdn.com/imgextra/i4/O1CN013LUitQ2723sWf1bJZ_!!6000000007738-0-tps-691-1278.jpg" alt="方音圖鑑网页截图" style={{ width: 240, height: 240, marginTop: 20, objectFit: 'cover', objectPosition: 'top' }} />
          </a>

        </div>,
        // icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        duration: false,
      });
      localStorage.setItem('dialects.yzup.top-notice', 'yes')

    }

  }, []);



  // console.log({
  //   routes,
  //   path: location.pathname
  // })
  if (routes.find(ele => ele.path == location.pathname)?.needNotLayout) {
    return <>

      <Routes>
        {
          routes.map((item, index) => {
            return <Route key={index} path={item.path} element={<item.component />} />
          })
        }
      </Routes>
    </>
  }

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: themeToken,
      }}
    >
      <div className={styles.layout}>
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
            本网站是基于「汉字音典」（<span className={styles.a_tag} onClick={handleGoOsfanMCPDict}>osfans/MCPDict</span>）开源数据进行二次开发的。
            如需反馈或建议，请前往<span className={styles.a_tag} onClick={handleGoOpenSource}>vearvip/mcpdict-frontend</span>提交Issue。
          </div>
        </div>
      </div>
      <FloatButton.BackTop />
    </ConfigProvider>
  );
};

export default Layout;



