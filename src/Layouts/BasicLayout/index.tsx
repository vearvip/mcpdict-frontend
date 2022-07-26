import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import styles from "./index.module.less";

const items: MenuProps["items"] = [
  {
    label: "首页",
    key: "0"
  },
  {
    label: "字音查询",
    key: "1"
  },
  {
    label: "长文注音",
    key: "2"
  },
  {
    label: "字典模式",
    key: "3"
  },
  {
    label: "参与注音",
    key: "4"
  },
];

export default function BasicLayout({ children, location }) {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div className={styles.layout}>
      <Menu
        className={styles.nav}
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      {children}
      <div className={styles.foot}>
        本站由vear支持 | 反馈请联系：<br />
        邮箱：vear.vip@qq.com，微信：vear-vip。
      </div>
    </div>
  );
}
