import { createEffect, createMemo, createSignal, For, onMount, Show } from 'solid-js';
import styles from './index.module.less';
import SearchInput from "@/components/SearchInput";
import LogoBlock from "@/components/LogoBlock";
import Skeleton from "@/components/Skeleton";
import NoData from "@/components/NoData";
import { makeBr, str2List } from '@/utils';
import { fetcher } from '@/utils/request';
import { queryChars } from '@/services';
import { useNavigate, useParams, useSearchParams } from '@solidjs/router';
import NProgress from 'nprogress';
import LeftBox from "./components/LeftBox";
import RightBox from "./components/RightBox";
import { unicodeLengthIgnoreSequence } from '@vearvip/hanzi-utils';

/**
 * 搜索组件，用于展示和处理搜索功能。
 *
 * @param {Object} props - 组件属性。
 */
const Search = (props) => {
  const push = useNavigate();
  const [searchParams] = useSearchParams({ q: '' });
  const [loading, setLoading] = createSignal(false);
  const [searchData, setSearchData] = createSignal([]);

  /**
   * 计算属性，用于检查搜索数据是否为空。
   *
   * @returns {boolean} 如果没有搜索数据或数据为空，则返回 true；否则返回 false。
   */
  const searchDataIsEmpty = createMemo(() => (!searchData() || searchData().length === 0));

  /**
   * 处理搜索动作，通过更新 URL 来设置新的搜索查询。
   *
   * @param {string} value - 要搜索的值。
   */
  const onSearch = async (value) => {
    push('/search?q=' + value, { replace: true });
  };

  /**
   * 根据提供的值执行搜索。
   *
   * @param {string} value - 要搜索的值。
   */
  const search = async (value) => {
    setLoading(true);
    NProgress.start();

    setSearchData([]);
    try {
      const result = await queryChars({
        char: value.split('').join(','),
        dialect: localStorage.getItem('selectedDialect') || ''
      });
      console.log('result', result);
      setSearchData(result.data);
    } finally {
      NProgress.done();
      setLoading(false);
    }
  };

  createEffect(() => search(searchParams?.q || ''));
  createEffect(() => {
    if (!searchParams.q) {
      setSearchData([]);
    }
  });

  return (
    <>
      <div class={styles.search_bar}>
        <div class={styles.logo_block}><LogoBlock /></div>
        <SearchInput
          defaultValue={searchParams?.q || ''}
          onSearch={onSearch}
          style={{ width: '100%' }} />
      </div>
      <div class={styles.search_content}>
        <Show when={!!searchParams.q && !searchDataIsEmpty()}>
          <LeftBox searchData={searchData()} />
          {/* <RightBox searchData={searchData()} /> */}
        </Show>
        <Show when={!searchParams.q || searchDataIsEmpty()}>
          <NoData />
        </Show>
      </div>
    </>
  );
};

export default Search;