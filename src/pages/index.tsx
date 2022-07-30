import { useEffect, useState } from "react"; 
import {  Divider, } from "antd"; 
import Book from "~/src/components/Book";
import SearchInput from "~/src/components/SearchInput";
import { logo, logoText } from "~/src/utils/asstes"; 
import styles from "./index.module.less";
import { getRandomColor } from '~/src/utils/index'
import { NextPage } from "next";
 
interface IndexProps {
  langs: Array<{
    name: string
    color: string
  }>
}

const Index = (props: IndexProps) => {
  const { langs } = props
  return (
    <div className={styles.index}>
      <div className={styles.main_box}>
        <div className={styles.logo_box}>
          <img className={styles.logo} src={logo} />
          <img className={styles.logo_text} src={logoText} />
        </div>
        <SearchInput style={{
          marginTop: 100
        }} />
      </div>
      <div className={styles.book_box}>
        <Divider className={styles.book_divider}>已收录方言</Divider>
        {
          langs.map((ele, index) => {
            return <div key={ele.name + index} className={styles.book_item}>
              <Book name={ele.name} color={ele.color} />
            </div>
          })
        }
      </div>
    </div>
  );
};


Index.getInitialProps = async (ctx: { query: { q: any; }; }) => { 
  try {
    const ret: {
      data: any
    } = await (fetch('https://www.fastmock.site/mock/5f99ddefce3c648ecfe8396d398bf461/asdf/book').then(res => res.json()))
    // console.log({ret})
    return {
      langs: ret.data
    }
  } catch (error) {
    // console.error(error)
    // return {
    //   langs: []
    // }
    return
  }
}

export default Index;
