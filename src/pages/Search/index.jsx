import React, { useState, useEffect, useRef } from 'react';
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
import { extractHanzi, unicodeLengthIgnoreSequence } from '@vearvip/hanzi-utils';
import { Button, FloatButton, message } from 'antd';
import { showDialectMap } from '../../components/DialectMap';
import { getSearchDialectList, groupVariants } from '../../utils';
import useStore from '@/store';
import { useAsyncEffect } from 'ahooks';
import { Filter, getLocalFilterData, setLocalFilterData } from '../../components/Filter';
import { usePad } from '../../utils/hooks';
import { Input } from 'antd';
import LeftRightContainer from '../../components/LeftRightContainer';
import { getLocalPageSettingData } from '../Setting';
import CharTable from './components/CharTable';
import CharList from './components/CharList';
import { Popover } from 'antd';
import HistoryRecord from '../../components/HistoryRecord';

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




/**
 * 搜索组件，用于展示和处理搜索功能。
 *
 * @param {Object} props - 组件属性。
 */
const Search = (props) => {
  const navigate = useNavigate();
  const pageSettingData = getLocalPageSettingData()
  const { store, setStore } = useStore()
  const [searchParams] = useSearchParams();
  const [searchData, setSearchData] = useState([]);
    const [popoverOpen, setPopoverOpen] = useState(false);
   const isPad =  usePad()

  const inputContainerRef = useRef(null);
  const [formData, setFormData] = useState(
    getLocalFilterData()
  )
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState(searchParams.get('q'))

  // 使用 getPopupContainer 将 Popover 内容挂载到同一个容器中
  const getPopupContainer = (triggerNode) => inputContainerRef.current;
  /**
   * 计算属性，用于检查搜索数据是否为空。
   *
   * @returns {boolean} 如果没有搜索数据或数据为空，则返回 true；否则返回 false。
   */
  const searchDataIsEmpty = (searchData) => (!searchData || searchData.length === 0);



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
    // const charList = [...new Set(value.split(''))]
    const charList = extractHanzi(value)

    let dialectList = getSearchDialectList(formData, store.dialectCateTree)
    // let dialectList = getSearchDialectList(filterData, store.dialectCateTree)

    try {
      const result = await queryChars({
        charList,
        dialectList
      });
      const groupVariantList = groupVariants(charList, result.variants)
      const charGroupList = []
      groupVariantList.forEach(groupItem => {
        (groupItem.variants || []).forEach(variant => {
          const charInfo = (result?.data ?? []).find(item => item.char === variant)?.charInfo
          if (charInfo) {
            charGroupList.push({
              char: variant,
              originChar: groupItem.char,
              charInfo: charInfo
            })
          }
        })
      })
      console.log('charGroupList', charGroupList)
      setSearchData(charGroupList);
    } catch (error) {
      console.error('error', error)
      // message.error(error.message)
    } finally {
      NProgress.done();
    }
  };

  useAsyncEffect(async () => {
    const q = searchParams.get('q');
    // await waitLoadDialectInfos();
    if (q) {
      if (
        !store.dialectInfos
        || !Array.isArray(store.dialectInfos)
        || store.dialectInfos.length === 0
      ) {
        console.log('dialectInfos 尚未准备好：', store.dialectInfos)
        return
      }
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





  const handleFilterChange = allValues => {
    console.log('allValues', allValues)
    setLocalFilterData(allValues)
    setFormData(allValues)
  }

  const handleInputChange = e => {
    setInputValue(e.target.value)
  }
  const handleSearch = () => {
    const q = searchParams.get('q');
    if (q === inputValue) {
      search(inputValue)
    } else {
      navigate(`/search?q=${inputValue}`, { replace: true });
    }
  }
  const handleHistoryChange = (historyValue) => {
    setInputValue(historyValue);
    setPopoverOpen(false); 
    handleSearch()
  }

  return <LeftRightContainer
    leftContent={<>
      <Filter onChange={handleFilterChange} />
      
      <Popover
        placement="bottomLeft"
        trigger={'click'}
        open={popoverOpen}
        arrow={false}
        overlayInnerStyle={{
          padding: 0
        }}
        content={<div className={isPad ? styles.history_record_mobile : styles.history_record}>
          <HistoryRecord onChange={handleHistoryChange} />
        </div>}
        getPopupContainer={getPopupContainer}
      >
        <div ref={inputContainerRef} className={styles.input_container}>
          
      <Input.Search
        value={inputValue}
        placeholder="请输入单字"
        loading={loading}
        enterButton
        maxLength={10}
        onFocus={() => {
          setPopoverOpen(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setPopoverOpen(false);
          }, 240)
        }}
        onClick={() => {
          setPopoverOpen(true);
        }}
        onChange={handleInputChange}
        onSearch={handleSearch}
      />
        </div>
      </Popover>
    </>}
    rightContent={
      searchDataIsEmpty(searchData)
        ? <div className="flex-center" style={{
          // border: '1px solid var(--border-color)', 
          height: 'calc(100vh - 160px)' 
        }}>
          <NoData text="请搜索" style={{ 
            position: 'relative'
           }} />
        </div>
        : <div className={styles.serach_result_box} style={{
          maxWidth: pageSettingData.searchPageFormat === 'table' ? '960px' : undefined,
          // border: '1px solid var(--border-color)'
        }}>
          {
            pageSettingData.searchPageFormat === 'table'
              ? <CharTable searchData={searchData} />
              : <CharList searchData={searchData} />
          }
        </div>
    }
  />
};

export default Search;
