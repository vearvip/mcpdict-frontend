import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import styles from "./index.module.less";

const items: MenuProps["items"] = [
  {
    label: "字音查询",
    key: "1"
    // icon: <SearchOutlined />,
  },
  {
    label: "长文注音",
    key: "2"
    // icon: <ProfileOutlined />,
  },
  {
    label: "字典模式",
    key: "3"
    // icon: <ReadOutlined />,
  },
  {
    label: "参与注音",
    key: "4"
    // icon: <SmileOutlined />,
  },
  {
    label: "关于本站",
    key: "5"
    // icon: <MailOutlined />,
  }
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
    </div>
  );
}
