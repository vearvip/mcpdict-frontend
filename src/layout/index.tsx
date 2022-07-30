import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useRouter } from "next/router";
import styles from "./index.module.less";
 

const items: MenuProps["items"] = [
  {
    label: "首页",
    key: "/"
  },
  {
    label: "字音查询",
    key: "/Search"
  },
  {
    label: "长文注音",
    key: "/LongSearch"
  },
  // {
  //   label: "多音字表模式",
  //   key: "/same-word"
  // },
  {
    label: "字典模式",
    key: "/Dict"
  },
  {
    label: "参与注音",
    key: "/Join"
  },
];

export default function BasicLayout(props: any) {
  
  const router = useRouter(); 
  // console.log('router', router)
  const { children } = props
  // const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    // setCurrent(e.key);
    router?.push(e.key)
  };

  return (
    <div className={styles.layout}>
      <Menu
        className={styles.nav}
        onClick={onClick}
        selectedKeys={[router.pathname]}
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
