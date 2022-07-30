import React, { useRef, useState } from 'react'
import styles from './index.module.less'
import SearchInput from "~/src/components/SearchInput";
import { logo, logoText } from "~/src/utils/asstes"; 
import { Skeleton, Input, Button } from 'antd';
import { SettingOutlined, SearchOutlined } from "@ant-design/icons";
import { NextPage } from 'next';
// import { useSize } from 'ahooks'; 

const LongSearch = (props: NextPage) => {
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
      {/* <SearchInput
        defaultValue={props?.searchParams?.q}
        style={{
          width: '100%', 
        }} />  */}
        <Input.TextArea placeholder="长文注音，单次只可选择一种语言，请在右侧设置按钮选择语言" maxLength={100} className={styles.input} />
        <div className={styles.btn_box}>
        <Button className={styles.setting}><SettingOutlined className={styles.icon} /></Button>
        <br />
        <Button className={styles.search_btn} type="primary"><SearchOutlined className={styles.icon} /></Button>
        </div>
    </div>
    <div className={styles.search_content}>
      <div className={styles.search_content_main}>
        {/* <div dangerouslySetInnerHTML={{ __html: data1 }}></div> */}
        <Skeleton active={loading} />
        <Skeleton active={loading} />
        <Skeleton active={loading} />
        <Skeleton active={loading} />
      </div> 
    </div>

  </React.Fragment>
}

LongSearch.displayName = 'LongSearch'

export default LongSearch