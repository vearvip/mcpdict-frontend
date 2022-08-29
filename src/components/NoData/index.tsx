import { Component } from 'solid-js'
import styles from './index.module.less'
import { noData } from "@/utils/asstes";


const Drawer: Component = (props) => {

  return <div class={styles.no_data_box}>
    <img src={noData} class={styles.no_data} />
  </div>
}

export default Drawer