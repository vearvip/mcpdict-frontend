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

/**
 * 搜索组件，用于展示和处理搜索功能。
 *
 * @param {Object} props - 组件属性。
 */
const Search = (props) => {
  const navigate = useNavigate();
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
    try {
      const result = await queryChars({
        char: value.split('').join(','),
        dialect: JSON.parse(localStorage.getItem('filterData') || '{}')?.dialectName
      });
      // console.log('result', result);
      setSearchData(result.data);
    } catch(error) {
      message.error(error.message)
    } finally {
      NProgress.done(); 
    }
  };

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      search(q);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!searchParams.get('q')) {
      setSearchData([]);
    }
  }, [searchParams]);

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
