import { Component, createEffect, createMemo, createSignal, For, onMount, Show } from 'solid-js'
import styles from './index.module.less'
import SearchInput from "@/components/SearchInput";
import LogoBlock from "@/components/LogoBlock";
import Skeleton from "@/components/Skeleton";
import NoData from "@/components/NoData";
import { Zi } from '@/types';
import { makeBr, str2List } from '@/utils';
import { fetcher } from '@/utils/request';
import { searchWords } from '@/services';
import { useNavigate, useParams, useSearchParams } from '@solidjs/router';
import NProgress from 'nprogress' 
import LeftBox from "./components/LeftBox";
import RightBox from "./components/RightBox";


const Search: Component = (props) => {
  const push = useNavigate()
  const [searchParams] = useSearchParams<{ q?: string }>();
  const [loading, setLoading] = createSignal(false)
  const [searchData, setSearchData] = createSignal<Zi[]>([])

  const searchDataIsEmpty = createMemo(() => (!searchData() || searchData().length === 0))

  const onSearch = async (value: string) => {
    push('/search?q=' + value, { replace: true })
  }

  const search = async (value: string) => {
    setLoading(true)
    NProgress.start();
    setSearchData((await searchWords({
      zis: str2List(value),
      fangYanIds: [localStorage.getItem('selectFangYanId')]
    })))
    NProgress.done();
    setLoading(false)
  }

  createEffect(() => search(searchParams?.q ?? ''));
  createEffect(() => {
    if (!searchParams.q) {
      setSearchData([])
    }
  });

  // onMount(() => { 
  //   onSearch(searchParams?.q ?? '')
  // })
  return <>
    <div class={styles.search_bar}>
      <div class={styles.logo_block}><LogoBlock /></div>

      <SearchInput
        defaultValue={(searchParams?.q ?? '') as string}
        onSearch={onSearch}
        style={{
          width: '100%',
        }} />
    </div>
    <div class={styles.search_content}>
      {/* {
        JSON.stringify(searchDataIsEmpty())
      } */}
      <Show when={!!searchParams.q && !searchDataIsEmpty()}>
        <LeftBox searchData={searchData()} />
        <RightBox searchData={searchData()} /> 
      </Show>
      <Show when={!searchParams.q || searchDataIsEmpty()}>
        <NoData />
      </Show>
    </div>

  </>
}


export default Search
