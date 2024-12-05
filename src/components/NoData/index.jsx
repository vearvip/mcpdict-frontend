import styles from './index.module.less'
import noData from '@/assets/webp/noData.webp'


const Drawer = (props) => {

  return <div className={styles.no_data_box}>
    <img src={noData} className={styles.no_data} />
  </div>
}

export default Drawer