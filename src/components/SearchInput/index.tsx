import React, { useState } from 'react'
import { SettingOutlined } from "@ant-design/icons";
import { Button, Divider, Input } from "antd";
import styles from "./index.module.less";

export default (props: {
  style?: React.CSSProperties
  defaultValue?: string
  onSearch?: Function
}) => {
  const [value, setValue] = useState('')
  return <Input.Group compact className={styles.input_box} style={props.style || {}}>
    <Input
      placeholder="请输入汉字搜索，单次最多十个汉字"
      size="large"
      defaultValue={props?.defaultValue}
      // value={value} 
      addonBefore={
        <Button className={styles.setting}>
          <SettingOutlined />
        </Button>
      }
      className={styles.input}
      onChange={_value => {
        // console.log({_value.tar})
        setValue(_value.target.value)
      }}
    />
    <Button size="large" type="primary" onClick={() => props.onSearch && props.onSearch(value)}>
      {/* 搜&nbsp;索 */}
      搜 索
    </Button>
  </Input.Group>
}