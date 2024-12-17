import React from 'react';
import Book from "@/components/Book";
import SearchInput from "@/components/SearchInput";
import logo from '@/assets/webp/logo.webp';
import styles from "./index.module.less";
import { useNavigate } from "react-router";
import { Divider } from 'antd';
import { message } from 'antd';
import useStore from '@/store';
import { JianCheng } from '../../utils/constant';
import { showDialectInfo } from '../../components/DialectInfo';
import CollapsibleContent from './components/CollapsibleContent';
import { getBackgroundColorFromItem, logoUrl } from '../../utils';


/**
 * 主页组件，用于展示主页内容，包括 Logo 和搜索输入框。
 *
 * @param {Object} props - 组件属性。
 */
const Index = (props) => {
  let navigate = useNavigate();
  const { store } = useStore()
  // console.log('store', store)

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
          <img className={styles.logo}
            src={logoUrl}
            alt="Logo" />
        </div>
        <SearchInput
          style={{
            marginTop: '100px'
          }}
          onSearch={onSearch}
        />
      </div>
      {/* <div className={styles.book_box}>
        <Divider className={styles.book_divider}>已收录</Divider>
        <CollapsibleContent height={650}>
          {(store?.dialectInfos ?? []).map((item) => (
            <div
              className={styles.book_item}
              key={item[JianCheng]}
              onClick={() => {
                showDialectInfo({
                  color: getBackgroundColorFromItem(item),
                  dialectName: item[JianCheng]
                })
              }}
            >
              <Book
                name={item[JianCheng]}
                color={getBackgroundColorFromItem(item)}
              />
            </div>
          ))}

        </CollapsibleContent>
      </div> */}
    </div>
  );
};

export default Index;



