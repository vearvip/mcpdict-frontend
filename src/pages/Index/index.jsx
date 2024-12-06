import React from 'react';
import Book from "@/components/Book";
import SearchInput from "@/components/SearchInput";
import logo from '@/assets/webp/logo.webp';
import styles from "./index.module.less";
import { useNavigate } from "react-router";
import { Divider } from 'antd';
import { message } from 'antd';
import useStore from '@/store';
import { JC, YDYS } from '../../utils/constant';


/**
 * 主页组件，用于展示主页内容，包括 Logo 和搜索输入框。
 *
 * @param {Object} props - 组件属性。
 */
const Index = (props) => {
  let navigate = useNavigate();
  const { store } = useStore()
  console.log('store', store)

  /**
   * 处理搜索动作，通过更新 URL 来设置新的搜索查询。
   *
   * @param {any} value - 要搜索的值。
   */
  const onSearch = async (value) => {
    navigate('/search?q=' + value);
  };

  return (
    <div className={styles.index}>
      <div className={`${styles.main_box} box`}>
        <div className={styles.logo_box}>
          <img className={styles.logo} src={logo} alt="Logo" />
        </div>
        <SearchInput
          style={{
            marginTop: '100px'
          }}
          onSearch={onSearch}
        />
      </div>
      <div className={styles.book_box}>
        <Divider className={styles.book_divider}>已收录方言</Divider>
        {(store?.dialectInfos ?? []).map((ele) => (
          <div
            className={styles.book_item}
            key={ele[JC]}
            onClick={() => message.info('🚧施工中')}
          >
            <Book
              name={ele[JC]}
              color={ele[YDYS]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;



