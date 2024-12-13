import React from 'react'

import styles from './index.module.less'; // 引入 CSS Module  

const CharLabel = ({
  char,
  originChar
}) => {
  return <div className={styles.char_label}>
    <div className={styles.char_label_main}>
      {char}
    </div>
    {
      char !== originChar && originChar
        ? <div className={styles.char_label_extra}>
          ({originChar})
        </div> : null
    }
  </div>
}

export default CharLabel