import React, { useEffect, useState } from 'react'
import Amap from '../AMap'
import styles from './index.module.less';
import Dialog from '../../components/Dialog'
import { FloatButton, Skeleton, Descriptions, Collapse } from 'antd';
import useStore from '@/store';
import { JieXiRiZhi, JianCheng, YuYan, JingWeiDu, LuRuRen, LaiYuan, WenJianMing, BanBen, ZiShu, WuZhengZiShu, YinJieShu, BuDaiDiaoYinJieShu, DiTuJiErFenQv, YinDianFenQv, ChenFangFenQv, TongYinZiBiao, WeiHuRen, CanKaoWenXian, BuChongYueDu, YinXiShuoMing } from '../../utils/constant'
// import ReactDOM from 'react-dom'
import { CloseOutlined } from '@ant-design/icons';
import { usePad, useMobile } from '../../utils/hooks';
import { createRoot } from 'react-dom/client';
import Book from '../Book';
import { queryDialectItemInfo } from '../../services';

// 定义一个函数来生成完整的URL并新开一个标签页
const openInNewTab = (path, params) => {
  // 获取当前页面的域名
  const currentDomain = window.location.origin;
  
  // 构造完整的URL
  let url = `${currentDomain}/#${path}`;
  
  // 如果有参数，则将其添加到URL后面
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    url += queryString ? `?${queryString}` : '';
  }

  // 使用 window.open 在新标签页打开URL
  window.open(url, '_blank');
};


const SkeletonBlock = () => {
  const isMobile = useMobile()
  let randomInt = Math.floor(Math.random() * ((isMobile ? 200 : 350) - 80 + 1)) + 80;
  return <Skeleton.Input size="small" active style={{
    width: `${randomInt}px`,
    height: '16px',
    marginTop: '3px'
  }} />
}


const DialectInfo = (props) => {
  const {
    dialectName,
    color,
    onClose
  } = props
  const [open, setOpen] = useState(true)
  const isPad = usePad();
  const [dialectInfo, setDialectInfo] = useState()
  const [loading, setLoading] = useState(false)




  const replaceLaiYuanATag = (htmlStr = '') => {
    return htmlStr.replaceAll(
      '\<a',
      '\<a target=\"_blank\"'
    )
  }


  const descriptionItems = [
    { key: 'YuYan', label: '地点', children: loading ? <SkeletonBlock /> : <div dangerouslySetInnerHTML={{ __html: dialectInfo?.[YuYan] }} /> },
    { key: 'JingWeiDu', label: '经纬度', children: loading ? <SkeletonBlock /> : <div dangerouslySetInnerHTML={{ __html: dialectInfo?.[JingWeiDu] }} /> },
    { key: 'LuRuRen', label: '录入人', children: loading ? <SkeletonBlock /> : <div dangerouslySetInnerHTML={{ __html: dialectInfo?.[LuRuRen] }} /> },
    { key: 'WeiHuRen', label: '维护人', children: loading ? <SkeletonBlock /> : <div dangerouslySetInnerHTML={{ __html: dialectInfo?.[WeiHuRen] }} /> },
    { key: 'LaiYuan', label: '来源', children: loading ? <SkeletonBlock /> : <div dangerouslySetInnerHTML={{ __html: replaceLaiYuanATag(dialectInfo?.[LaiYuan]) }} /> },
    { key: 'WenJianMing', label: '文件名', children: loading ? <SkeletonBlock /> : <div dangerouslySetInnerHTML={{ __html: dialectInfo?.[WenJianMing] }} /> },
    { key: 'BanBen', label: '版本', children: loading ? <SkeletonBlock /> : <div dangerouslySetInnerHTML={{ __html: dialectInfo?.[BanBen] }} /> },
    { key: 'ZiShu', label: '字数', children: loading ? <SkeletonBlock /> : <div dangerouslySetInnerHTML={{ __html: dialectInfo?.[ZiShu] }} /> },
    { key: 'WuZhengZiShu', label: '□数', children: loading ? <SkeletonBlock /> : <div dangerouslySetInnerHTML={{ __html: dialectInfo?.[WuZhengZiShu] }} /> },
    { key: 'YinJieShu', label: '音節数', children: loading ? <SkeletonBlock /> : <div dangerouslySetInnerHTML={{ __html: dialectInfo?.[YinJieShu] }} /> },
    { key: 'BuDaiDiaoYinJieShu', label: '不带调音节数', children: loading ? <SkeletonBlock /> : <div dangerouslySetInnerHTML={{ __html: dialectInfo?.[BuDaiDiaoYinJieShu] }} /> },
    { key: 'DiTuJiErFenQv', label: '地图集二分区', children: loading ? <SkeletonBlock /> : <div dangerouslySetInnerHTML={{ __html: dialectInfo?.[DiTuJiErFenQv] }} /> },
    { key: 'YinDianFenQv', label: '音典分区', children: loading ? <SkeletonBlock /> : <div dangerouslySetInnerHTML={{ __html: dialectInfo?.[YinDianFenQv] }} /> },
    { key: 'CanKaoWenXian', label: '参考文献', children: loading ? <SkeletonBlock /> : <div dangerouslySetInnerHTML={{ __html: dialectInfo?.[CanKaoWenXian] }} /> },
    { key: 'BuChongYueDu', label: '补充阅读', children: loading ? <SkeletonBlock /> : <div dangerouslySetInnerHTML={{ __html: dialectInfo?.[BuChongYueDu] }} /> },
    { key: 'YinXiShuoMing', label: '音系说明', children: loading ? <SkeletonBlock /> : <div dangerouslySetInnerHTML={{ __html: dialectInfo?.[YinXiShuoMing] }} /> },
 
    // { key: 'ChenFangFenQv', label: '陈邡分区', children: loading? <SkeletonBlock /> : <div dangerouslySetInnerHTML={{ __html: dialectInfo?.[ChenFangFenQv] }} /> },
  ]

  const handleClose = () => {
    setOpen(false)
    onClose && onClose()
  }
  const getDialectItemInfo = async (dialectName) => {
    setLoading(true)
    try {
      const result = await queryDialectItemInfo({
        name: dialectName
      })
      setDialectInfo(result.data)
      // console.log('result', result.data)
    } catch (error) {
      console.error('❌ 查询方言信息失败:', error)
    } finally {
      setLoading(false)
    }
  }
 
  useEffect(() => {
    getDialectItemInfo(dialectName)
  }, [dialectName])

  return <Dialog
    open={open}
    onClose={handleClose}
    drawerProps={{
      closeIcon: false,
      // styles: {
      //   body: {
      //     padding: 0
      //   }
      // },
      footer: false
    }}
    modalProps={{
      closeIcon: false,
      // width: '90vw',
      // styles: {
      //   content: {
      //     padding: '12px 12px 0 12px',
      //     borderRadius: 10,
      //     overflow: 'hidden'
      //   }
      // },
      // style: {
      //   top: '3vh',
      // },
      footer: false
    }}
  >
  <div className={styles.dialog_container}>
    {
      dialectInfo?.[TongYinZiBiao] && <div className={styles.label_tag} onClick={() => {
        openInNewTab('/homophoneList', {
          dialectName 
        })
      }}>
      {TongYinZiBiao}
    </div>
    }
  
    <Descriptions title={<div className="flex-center" style={{
      margin: isPad ? '-25px 0 -25px 0' : undefined
    }}>
      <Book name={dialectName} color={color} style={{
        transform: isPad ? 'scale(0.7)' : undefined
      }} />
    </div>} items={descriptionItems} size="small" column={1} />
    {
      dialectInfo?.[JieXiRiZhi]
        ? <Collapse
          ghost
          items={[{
            key: '1',
            label: '解析日志',
            children: <div style={{ marginLeft: 15 }}>{dialectInfo?.[JieXiRiZhi]}</div>
          }]}
          style={{
            marginLeft: -15,
            color: '#333'
          }}
        />
        : null
    }

</div>
  </Dialog>
}


let dialogContainer = null;
let root = null;

export const showDialectInfo = (props = {}) => {
  const {
    dialectName,
    color,
    onClose
  } = props;

  // 如果对话框容器已经存在，则不再创建新的容器
  if (!dialogContainer) {
    dialogContainer = document.createElement('div');
    document.body.appendChild(dialogContainer);
    root = createRoot(dialogContainer); // 创建根实例
  }

  // 定义关闭对话框的方法
  const handleClose = (...args) => {
    // 移除DOM中的容器元素
    setTimeout(() => {
      if (dialogContainer.parentNode) {
        dialogContainer.parentNode.removeChild(dialogContainer);
        dialogContainer = null; // 清空容器引用
        root = null; // 清空根实例引用
      }
      // 调用传递的onClose回调，如果有的话
      onClose && onClose.call(this, ...args);
    }, 500); // 假设这里的500ms是为了等待动画完成
  };

  // 渲染对话框组件到根中
  root.render(
    <DialectInfo
      dialectName={dialectName}
      color={color}
      onClose={handleClose}
    />
  );
};
