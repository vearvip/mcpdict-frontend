import { useState, useEffect, useRef } from "react";
import styles from "./index.module.less";
import SearchInput from "@/components/SearchInput";
import LogoBlock from "@/components/LogoBlock";
import NoData from "@/components/NoData";
import { queryChars, queryCharsByType } from "@/services";
import { useNavigate, useSearchParams } from "react-router";
import NProgress from "nprogress";
import LeftBox from "./components/LeftBox";
import { extractHanzi } from "@vearvip/hanzi-utils";
import { formatSearchData, getSearchDialectList, groupVariants } from "../../utils";
import useStore from "@/store";
import { useAsyncEffect } from "ahooks";
import { getLocalFilterData } from "../../components/Filter";
import { useMobile } from "../../utils/hooks";
import eventBus from "../../event/bus";

/**
 * 搜索组件，用于展示和处理搜索功能。
 */
const Search = () => {
  const navigate = useNavigate();
  const isMobile = useMobile();
  const { store } = useStore();
  const [searchParams] = useSearchParams();
  const [searchData, setSearchData] = useState([]);

  const requestIdRef = useRef(0);
  const abortControllerRef = useRef(null);

  const searchDataIsEmpty = (data) => !data || data.length === 0;

  /**
   * 处理搜索动作：同值直接搜索，不同值先更新 URL，避免请求与地址栏不一致。
   */
  const onSearch = async (value, needSearch = false) => {
    const q = searchParams.get("q");
    if (needSearch || q === value) {
      await searchByType(value);
    } else {
      const search = new URLSearchParams({ q: value }).toString();
      navigate({ pathname: "/search", search: `?${search}` }, { replace: true });
    }
  };

  const searchByType = async (value) => {
    if (!value) {
      setSearchData([]);
      NProgress.done();
      return;
    }

    const requestId = ++requestIdRef.current;
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    NProgress.start();

    const filterData = getLocalFilterData();
    const dialectList = getSearchDialectList(
      filterData,
      store.dialectCateTree,
      store.dialectDistrictTree,
    );

    try {
      const charList = extractHanzi(value);
      let result;
      let groupVariantList;

      if (filterData.queryType === "hanzi") {
        result = await queryChars(
          {
            charList,
            dialectList,
            queryType: filterData.queryType,
          },
          { signal: controller.signal },
        );
        groupVariantList = groupVariants(charList, result?.data?.variants ?? []);
      } else {
        result = await queryCharsByType(
          {
            queryStr: value,
            dialectList,
            queryType: filterData.queryType,
          },
          { signal: controller.signal },
        );
        const variants = result?.data?.variants ?? [];
        groupVariantList = groupVariants(variants, variants);
      }

      if (requestId !== requestIdRef.current) return;

      const charGroupList = [];
      groupVariantList.forEach((groupItem) => {
        charGroupList.push(
          ...formatSearchData(
            result?.data?.data,
            groupItem.variants,
            groupItem.char,
            store.dialectSort,
          ),
        );
      });
      setSearchData(charGroupList);
    } catch (error) {
      if (error?.code === "ABORTED") return;
      console.error("搜索失败：", error);
      setSearchData([]);
    } finally {
      if (requestId === requestIdRef.current) NProgress.done();
    }
  };

  useAsyncEffect(async () => {
    const q = searchParams.get("q");
    if (!q) {
      setSearchData([]);
      NProgress.done();
      return;
    }
    if (
      !Array.isArray(store.dialectInfos) ||
      store.dialectInfos.length === 0
    ) {
      return;
    }
    await searchByType(q);
  }, [
    searchParams,
    store.dialectInfos,
    store.dialectCateTree,
    store.dialectDistrictTree,
    store.dialectSort,
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handler = (...args) => {
      onSearch(...args);
    };
    eventBus.on("SEARCH_EVENT", handler);
    return () => eventBus.off("SEARCH_EVENT", handler);
  }, [store, searchParams]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
      NProgress.done();
    };
  }, []);

  return (
    <>
      {!isMobile && (
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
      )}
      <div className={styles.search_content}>
        {searchParams.get("q") && !searchDataIsEmpty(searchData) ? (
          <LeftBox searchData={searchData} />
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
};

export default Search;
