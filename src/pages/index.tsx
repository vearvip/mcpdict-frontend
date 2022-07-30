import { useEffect, useState } from "react"; 
import {  Divider, } from "antd"; 
import Book from "~/src/components/Book";
import SearchInput from "~/src/components/SearchInput";
import { logo, logoText } from "~/src/utils/asstes"; 
import styles from "~/src/styles/index.module.less";
import { getRandomColor, Props } from '~/src/utils/index'
import { NextPage } from "next";
import { useRouter } from "next/router";
import { fetcher } from "../utils/request";
import { getLangs } from "../services";
 
interface IndexProps {
  langs: Array<{
    name: string
    color: string
  }>
}

const Index = (props: IndexProps) => {
  const { langs } = props
  const router = useRouter() 

  const onSearch = async (value: any) => {
    router.push('/search?q=' + value) 
  }


  return (
    <div className={styles.index}>
      <div className={styles.main_box}>
        <div className={styles.logo_box}>
          <img className={styles.logo} src={logo} />
          <img className={styles.logo_text} src={logoText} />
        </div>
        <SearchInput style={{
          marginTop: 100
        }} onSearch={onSearch} />
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


export async function getServerSideProps() {  
  return Props(await getLangs())
}

export default Index;
