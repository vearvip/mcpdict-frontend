import { Empty } from 'antd'
import styles from './index.module.less' 
// import noData from '@/assets/webp/noData.webp'


const NoData = (props) => {

  return <div className={styles.no_data_box} style={props.style}>
    {/* <img src={noData} className={styles.no_data} /> */}
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 60,
      }}
      description={ 
        <div>暂无数据</div> 
      }
    />
  </div>
}

export default NoData