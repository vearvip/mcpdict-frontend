import React from 'react'
import styles from './index.module.less'; // 引入 CSS Module 

const CharPhoneticExplain = (props) => {
  // const finalPhonetic = (props.phonetic || '').replace('{', `<span class="${styles.explain}">`).replace('}', `</span>`)

  return <div className={styles.phonetic_explain}>
    {
      props.phonetic && <span className={styles.phonetic}>{props.phonetic}</span>
    }
    {
      props.explain && <span className={styles.explain}>{props.explain}</span>
    }
  </div>
}


export default CharPhoneticExplain