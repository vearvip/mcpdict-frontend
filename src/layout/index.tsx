import React, { useEffect, useState } from "react";
import { Button, MenuProps, Popover } from "antd";
import { Menu } from "antd";
import { useRouter } from "next/router";
import styles from "./index.module.less";
import Head from "next/head";
import { upyunLogo } from "../utils/asstes";

const items: MenuProps["items"] = [
  {
    label: "首页",
    key: "/"
  },
  {
    label: "字音查询",
    key: "/search"
  },
  {
    label: "长文注音",
    key: "/long-search"
  },
  // {
  //   label: "多音字表模式",
  //   key: "/same-word"
  // },
  {
    label: "字典模式",
    key: "/dict"
  },
  {
    label: "参与注音",
    key: "/join"
  },
];

export default function BasicLayout(props: any) {

  const router = useRouter();
  // console.log('router', router)
  const { children } = props
  // const [current, setCurrent] = useState("mail");

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    // setCurrent(e.key);
    router?.push(e.key)
  };

  const handleGoVearPage = () => {
    window.open('https://vear.vip')
  }

  const handleUpyunClick = () => {
    window.open('https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral')
  }

  return (
    <div className={styles.layout}> 
    
      <Head>
        <title>湘语雅音</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Menu
        className={styles.nav}
        onClick={handleMenuClick}
        selectedKeys={[router.pathname]}
        mode="horizontal"
        items={items}
      />
      {children}
      <div className={styles.foot}>
        <div>
          本网站由<Button type="link" className={`${styles.btn_link} ${styles.vear}`} onClick={handleGoVearPage}>vear</Button>支持，反馈请<Popover content={<div>
            邮箱：vear.vip@qq.com，微信：vear-vip。
          </div>} >
            <Button type="link" className={styles.btn_link}>联系</Button>
          </Popover>
        </div>
        <div>
        本网站由<img src={upyunLogo} className={styles.upyun_logo} onClick={handleUpyunClick} />提供CDN加速/云存储服务
        </div>
      </div>
    </div>
  );
}
