import React, { useRef, useState } from 'react'
import styles from './index.module.less'
import SearchInput from "@/components/SearchInput";
import logo from "@/assets/logo.png";
import logoText from "@/assets/logo_text.png";
import { Skeleton } from 'antd';
// import { useSize } from 'ahooks'; 

export default (props) => {
  const [loading, setLoading] = useState(true)
  // console.log('props', props)
  // const searchContentRef = useRef(null) 
  // const searchContentSize = useSize(searchContentRef);
  return <React.Fragment>
    {/* {searchContentSize} */}
    <div className={styles.search_bar}>
      <div className={styles.logo_box}>
        <img className={styles.logo} src={logo as any} />
        <img className={styles.logo_text} src={logoText as any} />
      </div>
      <SearchInput
        defaultValue={props?.searchParams?.q}
        style={{
          width: '100%',
          // margin: '0 auto',
          // maxWidth: '100%'
          // marginLeft: 20
        }} />
      {/* {searchContentSize} */}
    </div>
    <div className={styles.search_content}>
      <div className={styles.left_box}>
        {/* <div dangerouslySetInnerHTML={{ __html: data1 }}></div> */}
        <Skeleton active={loading} />
        <Skeleton active={loading} />
        <Skeleton active={loading} />
        <Skeleton active={loading} />
      </div>
      <div className={styles.right_box}>

        {/* <div dangerouslySetInnerHTML={{ __html: data2 }}></div> */}
        <Skeleton.Image active={loading}style={{ marginBottom: 20 }} />
        <Skeleton active={loading} />
      </div>
    </div>

  </React.Fragment>
}