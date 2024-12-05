import { Empty } from 'antd'
import styles from './index.module.less'
import { Typography } from 'antd'
// import noData from '@/assets/webp/noData.webp'


const NoData = (props) => {

  return <div className={styles.no_data_box}>
    {/* <img src={noData} className={styles.no_data} /> */}
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 60,
      }}
      description={
        <Typography.Text type="secondary">
          暂无数据
        </Typography.Text>
      }
    />
  </div>
}

export default NoData