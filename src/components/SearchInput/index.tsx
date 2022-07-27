import React from 'react'
import { SettingOutlined } from "@ant-design/icons";
import { Button, Divider, Input } from "antd";
import styles from "./index.module.less";

export default (props: {
  style?: React.CSSProperties,
  defaultValue?: string
}) => {
  return <Input.Group compact className={styles.input_box} style={props.style || {}}>
    <Input
      placeholder="请输入汉字搜索，单次最多十个汉字"
      size="large"
      defaultValue={props?.defaultValue}
      addonBefore={
        <Button className={styles.setting}>
          <SettingOutlined />
        </Button>
      }
      className={styles.input}
    />
    <Button size="large" type="primary">
      {/* 搜&nbsp;索 */}
      搜 索
    </Button>
  </Input.Group>
}