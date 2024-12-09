import React, { useState, useEffect } from 'react';
import styles from './index.module.less';
import SearchInput from "@/components/SearchInput";
import LogoBlock from "@/components/LogoBlock";
// import Skeleton from "@/components/Skeleton";
import NoData from "@/components/NoData";
import { makeBr, str2List } from '@/utils';
import { fetcher } from '@/utils/request';
import { queryChars } from '@/services';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import NProgress from 'nprogress';
import LeftBox from "./components/LeftBox";
import RightBox from "./components/RightBox";
import { unicodeLengthIgnoreSequence } from '@vearvip/hanzi-utils';
import { Button, FloatButton, message } from 'antd';
import { showDialectMap } from '../../components/DialectMap';
import { groupVariants } from '../../utils';
import useStore from '@/store';
import { useAsyncEffect } from 'ahooks';

const waitLoadDialectInfos = () => {
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(() => { 
      if (window.dialectInfosWasReady) {
        clearInterval(intervalId);
        resolve();
      }
    }, 80);
  });
};


function findDialectsByPath(tree, path) {
  // Split the input path into levels.
  const pathLevels = path.split('-');

  function searchNode(nodes, levels) {
    if (!nodes || levels.length === 0) {
      return [];
    }

    const [currentLevel, ...restLevels] = levels;
    
    for (let node of nodes) {
      if (node.label === currentLevel) {
        if (restLevels.length === 0) {
          // If all levels have been processed, return the dialects of the current node.
          return node.dialects || [];
        } else if (node.children && Array.isArray(node.children)) {
          // Recursively search in the children.
          return searchNode(node.children, restLevels);
        }
      }
    }

    // If no matching node is found, return an empty array.
    return [];
  }

  // Start searching from the root of the tree.
  return searchNode(tree, pathLevels);
}


/**
 * 搜索组件，用于展示和处理搜索功能。
 *
 * @param {Object} props - 组件属性。
 */
const Search = (props) => {
  const navigate = useNavigate();
  const { store, setStore } = useStore()
  const [searchParams] = useSearchParams();
  const [searchData, setSearchData] = useState([]);

  /**
   * 计算属性，用于检查搜索数据是否为空。
   *
   * @returns {boolean} 如果没有搜索数据或数据为空，则返回 true；否则返回 false。
   */
  const searchDataIsEmpty = () => (!searchData || searchData.length === 0);

  /**
   * 处理搜索动作，通过更新 URL 来设置新的搜索查询。
   *
   * @param {string} value - 要搜索的值。
   */
  const onSearch = async (value, needSearch = false) => {
    if (needSearch) {
      search(value)
    } else {
      navigate(`/search?q=${value}`, { replace: true });
    }
  };

  /**
   * 根据提供的值执行搜索。
   *
   * @param {string} value - 要搜索的值。
   */
  const search = async (value) => {
    if (!value) {
      setSearchData([]);
      return
    }

    NProgress.start();

    // setSearchData([]);
    const charList = [...new Set(value.split(''))]

    let dialectList
    const filterData = JSON.parse(localStorage.getItem('filterData') || '{}')
    if (filterData.filterMode === 'lang') {
      dialectList = filterData?.dialectName ? [filterData.dialectName] : []
    } else if (filterData.filterMode === 'area') {
      let dialects = findDialectsByPath(store.dialectCateTree, filterData.dialectArea)
      // console.log('dialects', filterData.dialectArea, dialects)
      dialectList = dialects
    } 

    try {
      const result = await queryChars({
        charList,
        dialectList
      });
      // console.log('result', result);
      // setSearchData(result.data);
      const groupVariantList = groupVariants(charList, result.variants)
      const charGroupList = []
      groupVariantList.forEach(groupItem => {
        (groupItem.variants || []).forEach(variant => {
          const charInfo = result.data.find(item => item.char === variant).charInfo
          charGroupList.push({
            char: variant,
            originChar: groupItem.char,
            charInfo: charInfo
          })
        })
      })
      // console.log('charGroupList', charGroupList)
      setSearchData(charGroupList);
    } catch (error) {
      message.error(error.message)
    } finally {
      NProgress.done();
    }
  };

  useAsyncEffect(async () => {
    const q = searchParams.get('q');
    if (q) {
      await waitLoadDialectInfos();
      search(q);
    } else {
      setSearchData([])
    }
  }, [searchParams, store]);
 

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [])

  return (
    <>
      <div className={styles.search_bar}>
        <div className={styles.logo_block}><LogoBlock /></div>
        <SearchInput
          defaultValue={searchParams.get('q') || ''}
          onSearch={onSearch}
          style={{ width: '100%' }} />
      </div>
      <div className={styles.search_content}>
        {!!searchParams.get('q') && !searchDataIsEmpty() ? (
          <LeftBox searchData={searchData} />
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
};

export default Search;
