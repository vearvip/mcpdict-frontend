import { useEffect, useState } from "react"; 
import {  Divider, } from "antd"; 
import Book from "~/src/components/Book";
import SearchInput from "~/src/components/SearchInput";
import { logo, logoText } from "~/src/utils/asstes"; 
import styles from "./index.module.less";
import { getRandomColor } from '~/src/utils/index'

const langs = [{
  name: '镇头',
  color: getRandomColor()
},{
  name: '官桥',
  color: getRandomColor()
},{
  name: '长沙',
  color: getRandomColor()
},{
  name: '湘潭',
  color: getRandomColor()
},{
  name: '宁乡',
  color: getRandomColor()
},{
  name: '浏阳',
  color: getRandomColor()
},{
  name: '韶山',
  color: getRandomColor()
},{
  name: '衡阳',
  color: getRandomColor()
},{
  name: '大瑶',
  color: getRandomColor()
},{
  name: '望城',
  color: getRandomColor()
},{
  name: '湘音检字',
  color: getRandomColor()
},{
  name: '训诂谐音',
  color: getRandomColor()
},{
  name: '老国音',
  color: getRandomColor()
},{
  name: '粤语',
  color: getRandomColor()
}]

const Index: React.FC = () => {
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

export default Index;
