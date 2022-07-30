import React, { useRef, useState } from 'react'
import styles from './index.module.less' 
import { Skeleton, Divider } from 'antd';
import { NextPage } from 'next';
// import { useSize } from 'ahooks'; 

const Dict = (props: NextPage) => {
  const [loading, setLoading] = useState(true)
  // console.log('props', props)
  // const searchContentRef = useRef(null) 
  // const searchContentSize = useSize(searchContentRef);
  return <React.Fragment> 
    <div className={styles.search_content}> 
        <div className={styles.book_page}>
          <div className={styles.book_page_left}>
            <Skeleton active={loading} />
            <Skeleton active={loading} />
            <Skeleton active={loading} />
            <Skeleton active={loading} />
            <Skeleton active={loading} /> 
            {/* <Skeleton active={loading} />
            <Skeleton active={loading} />
            <Skeleton active={loading} /> 
            <Skeleton active={loading} />
            <Skeleton active={loading} />
            <Skeleton active={loading} /> 
            <Skeleton active={loading} />
            <Skeleton active={loading} />
            <Skeleton active={loading} />  */}
          </div>
          <Divider type="vertical" className={styles.book_page_divider}  />
          <div className={styles.book_page_right}>
            <Skeleton active={loading} />
            <Skeleton active={loading} />
            <Skeleton active={loading} />
            <Skeleton active={loading} />
            <Skeleton active={loading} /> 
          </div>
        </div>
        <div className={`${styles.book_page} ${styles.book_page2}`}>
          <div className={styles.book_page_left}>
            <Skeleton active={loading} />
            <Skeleton active={loading} />
            <Skeleton active={loading} />
            <Skeleton active={loading} />
            <Skeleton active={loading} /> 
          </div>
          <Divider type="vertical" className={styles.book_page_divider}  />
          <div className={styles.book_page_right}>
            <Skeleton active={loading} />
            <Skeleton active={loading} />
            <Skeleton active={loading} />
            <Skeleton active={loading} />
            <Skeleton active={loading} /> 
          </div>
        </div>  
    </div>

  </React.Fragment>
}

Dict.displayName = 'Dict'

export default Dict