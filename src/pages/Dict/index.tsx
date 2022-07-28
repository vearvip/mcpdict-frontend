import React, { useRef } from 'react'
import styles from './index.module.less' 
import { Skeleton, Divider } from 'antd';
// import { useSize } from 'ahooks'; 

export default (props) => {
  // console.log('props', props)
  // const searchContentRef = useRef(null) 
  // const searchContentSize = useSize(searchContentRef);
  return <React.Fragment> 
    <div className={styles.search_content}> 
        <div className={styles.book_page}>
          <div className={styles.book_page_left}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          <Divider type="vertical" className={styles.book_page_divider}  />
          <div className={styles.book_page_right}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
        <div className={styles.book_page}>
          <div className={styles.book_page_left}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          <Divider type="vertical" className={styles.book_page_divider}  />
          <div className={styles.book_page_right}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>  
    </div>

  </React.Fragment>
}