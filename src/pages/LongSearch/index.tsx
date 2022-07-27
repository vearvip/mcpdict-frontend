import React, { useRef } from 'react'
import styles from './index.module.less'
import SearchInput from "../../components/SearchInput";
import logo from "../../assets/logo.png";
import logoText from "../../assets/logo_text.png";
import { Skeleton, Input, Button } from 'antd';
import { SettingOutlined, SearchOutlined } from "@ant-design/icons";
// import { useSize } from 'ahooks'; 

export default (props) => {
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
        <Input.TextArea maxLength={100} className={styles.input} />
        <div className={styles.btn_box}>
        <Button className={styles.setting}><SettingOutlined className={styles.icon} /></Button>
        <br />
        <Button className={styles.search_btn} type="primary"><SearchOutlined className={styles.icon} /></Button>
        </div>
    </div>
    <div className={styles.search_content}>
      <div className={styles.left_box}>
        {/* <div dangerouslySetInnerHTML={{ __html: data1 }}></div> */}
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div> 
    </div>

  </React.Fragment>
}