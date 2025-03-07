import React, { useState } from 'react';
import Book from "@/components/Book";
import SearchInput from "@/components/SearchInput";
import logo from '@/assets/webp/logo.webp';
import styles from "./index.module.less";
import { useNavigate } from "react-router";
import { Divider, Skeleton, Tree } from 'antd';
import { message } from 'antd';
import useStore from '@/store';
import { JianCheng } from '../../utils/constant';
import { showDialectInfo } from '../../components/DialectInfo';
import CollapsibleContent from './components/CollapsibleContent';
import { getBackgroundColorFromItem, isApple, logoLargeUrl, isSafari } from '../../utils';
import { ProjectOutlined } from '@ant-design/icons'
import Dialog from '../../components/Dialog';
import DialectTable from './components/DialectTable';

const BookSkeletons = () => {
  const skeleton = new Array(100).fill().map((item, index) => {
    return <Skeleton.Node
      key={`skeleton_node_${index}`}
      active
      style={{
        width: 130,
        height: 180,
        marginRight: 20,
        marginBottom: 20,
      }}
    />
  })

  // return isApple() && isSafari()
  return isApple()
    ? skeleton
    : <CollapsibleContent height={650}>
      {skeleton}
    </CollapsibleContent>
}
const Books = () => {
  const { store } = useStore()
  const books = (store?.dialectInfos ?? []).map((item) => (
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
  ))
  // return isApple() && isSafari()
  return isApple()
    ? books
    : <CollapsibleContent height={650}>
      {books}
    </CollapsibleContent>
}

/**
 * 主页组件，用于展示主页内容，包括 Logo 和搜索输入框。
 *
 * @param {Object} props - 组件属性。
 */
const Index = (props) => {
  let navigate = useNavigate();
  const { store } = useStore()
  // console.log('store', store)
  const [openTableDialog, setOpenTableDialog] = useState(false)

  /**
   * 处理搜索动作，通过更新 URL 来设置新的搜索查询。
   *
   * @param {any} value - 要搜索的值。
   */
  const onSearch = async (value) => {
    navigate('/search?q=' + value);
  };

  const handleShowDialectTable = () => {
    setOpenTableDialog(true)
  }



  return (
    <div className={styles.index}>
      <div className={`${styles.main_box} box`}>
        <div className={styles.logo_box}>
          <img className={`logo ${styles.logo}`} id="logo"
            src={logoLargeUrl}
            alt="Logo" />
        </div>
        <SearchInput
          style={{
            marginTop: '100px'
          }}
          onSearch={onSearch}
        />
        {/* <Tree
          treeData={store.dialectDistrictTree}
          height={233}
          defaultExpandAll
          titleRender={(item) => {
            return item.title
          }}
          style={{ border:'1px solid red', width: '500px' }}
        /> */}
      </div>
      <div className={styles.book_box}>
        <Divider className={styles.book_divider}>
          已收录
          {/* <ProjectOutlined onClick={handleShowDialectTable} style={{
            marginLeft: 5,
            cursor: 'pointer',
            color: 'var(--color)'
          }} /> */}
        </Divider>

        <DialectTable dataSource={store?.dialectInfos ?? []} />
        {/* {
          (store?.dialectInfos ?? []).length > 0 ? <Books /> : <BookSkeletons />
        } */}
      </div>
      <Dialog
        open={openTableDialog}
        onCancel={() => setOpenTableDialog(false)}
        onClose={() => setOpenTableDialog(false)}
        drawerProps={{
          footer: null
        }}
        modalProps={{
          footer: null,
          width: '800px'
        }}
      >
        <DialectTable dataSource={store?.dialectInfos ?? []} />
      </Dialog>
    </div>
  );
};

export default Index;



