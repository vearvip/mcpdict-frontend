import { useEffect, useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import logo from "./imgs/logo.png";
import logoText from "./imgs/logo_text.png";
import styles from "./index.module.less";

const Index: React.FC = () => {
  return (
    <div className={styles.index}>
      <div className={styles.main_box}>
        <div className={styles.logo_box}>
          <img className={styles.logo} src={logo as any} />
          <img className={styles.logo_text} src={logoText as any} />
        </div>
        <Input.Group compact className={styles.input_box}>
          <Input
            size="large"
            addonBefore={<SettingOutlined className={styles.setting} />}
            className={styles.input}
          />
          <Button size="large" type="primary">
            搜&nbsp;索
          </Button>
        </Input.Group>
      </div>
      <div className={styles.book_box}></div>
    </div>
  );
};

export default Index;
