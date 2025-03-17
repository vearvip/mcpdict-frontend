import React, { useState, useEffect } from "react";
import styles from "./index.module.less";
import SearchInput from "@/components/SearchInput";
import LogoBlock from "@/components/LogoBlock";
// import Skeleton from "@/components/Skeleton";
import NoData from "@/components/NoData";
import { makeBr, str2List } from "@/utils";
import { fetcher } from "@/utils/request";
import { queryChars } from "@/services";
import { useNavigate, useParams, useSearchParams } from "react-router";
import NProgress from "nprogress";
import LeftBox from "./components/LeftBox";
import RightBox from "./components/RightBox";
import {
  extractHanzi,
  unicodeLengthIgnoreSequence,
} from "@vearvip/hanzi-utils";
import { Button, FloatButton, message } from "antd";
import { showDialectMap } from "../../components/DialectMap";
import { getSearchDialectList, groupVariants } from "../../utils";
import useStore from "@/store";
import { useAsyncEffect } from "ahooks";
import { getLocalFilterData } from "../../components/Filter";

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
  const { store, setStore } = useStore();
  const [searchParams] = useSearchParams();
  const [searchData, setSearchData] = useState([]);

  /**
   * 计算属性，用于检查搜索数据是否为空。
   *
   * @returns {boolean} 如果没有搜索数据或数据为空，则返回 true；否则返回 false。
   */
  const searchDataIsEmpty = (searchData) =>
    !searchData || searchData.length === 0;

  /**
   * 处理搜索动作，通过更新 URL 来设置新的搜索查询。
   *
   * @param {string} value - 要搜索的值。
   */
  const onSearch = async (value, needSearch = false) => {
    const q = searchParams.get("q");
    if (needSearch) {
      searchByHanZi(value);
    } else if (q === value) {
      searchByHanZi(value);
    } else {
      navigate(`/search?q=${value}`, { replace: true });
    }
  };

  /**
   * 根据提供的值执行搜索。
   *
   * @param {string} value - 要搜索的值。
   */
  const searchByHanZi = async (value) => {
    if (!value) {
      setSearchData([]);
      return;
    }

    NProgress.start();
    // const charList = [...new Set(value.split(''))]
    const charList = extractHanzi(value);

    const filterData = getLocalFilterData();
    let dialectList = getSearchDialectList(
      filterData,
      store.dialectCateTree,
      store.dialectDistrictTree
    );

    try {
      const result = await queryChars({
        charList,
        dialectList,
      });
      const groupVariantList = groupVariants(
        charList,
        result?.data?.variants ?? []
      );
      const charGroupList = [];
      groupVariantList.forEach((groupItem) => {
        (groupItem.variants || []).forEach((variant) => {
          const charInfo = (result?.data?.data ?? []).find(
            (item) => item.char === variant
          )?.charInfo;
          if (charInfo) {
            charGroupList.push({
              char: variant,
              originChar: groupItem.char,
              charInfo: charInfo,
            });
          }
        });
      });
      // console.log('charGroupList', charGroupList)
      setSearchData(charGroupList);
    } catch (error) {
      console.error("error", error);
      // message.error(error.message)
    } finally {
      NProgress.done();
    }
  };

  useAsyncEffect(async () => {
    const q = searchParams.get("q");
    // await waitLoadDialectInfos();
    NProgress.start();
    if (q) {
      if (
        !store.dialectInfos ||
        !Array.isArray(store.dialectInfos) ||
        store.dialectInfos.length === 0
      ) {
        console.warn("⚠️ dialectInfos 尚未准备好");
        return;
      }
      searchByHanZi(q);
    } else {
      setSearchData([]);
      NProgress.done();
    }
  }, [searchParams, store]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className={styles.search_bar}>
        <div className={styles.logo_block}>
          <LogoBlock />
        </div>
        <SearchInput
          defaultValue={searchParams.get("q") || ""}
          onSearch={onSearch}
          style={{ width: "100%" }}
        />
      </div>
      <div className={styles.search_content}>
        {!!searchParams.get("q") && !searchDataIsEmpty(searchData) ? (
          <LeftBox searchData={searchData} />
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
};

export default Search;
