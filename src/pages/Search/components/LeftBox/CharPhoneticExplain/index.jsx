import React from 'react'
import styles from './index.module.less'; // 引入 CSS Module 

const CharPhoneticExplain = (props) => {
  return <div className={styles.phonetic_explain}>
    <span className={styles.phonetic}>{props.phonetic}</span>
    <span className={styles.explain}>{props.explain}</span>
  </div> 
}


export default CharPhoneticExplain