import { Component, createEffect, createMemo, createSignal, For, onMount, Show } from 'solid-js'
import styles from './index.module.less'
import SearchInput from "@/components/SearchInput";
import LogoBlock from "@/components/LogoBlock";
import Skeleton from "@/components/Skeleton";
import NoData from "@/components/NoData";
import { Zi } from '@/types';
import { makeBr } from '@/utils';
import { fetcher } from '@/utils/request';
import { searchWords } from '@/services';
import { useNavigate, useParams, useSearchParams } from '@solidjs/router';
import NProgress from 'nprogress'
// import { Skeleton } from 'antd'; 

// import { useSize } from 'ahooks'; 


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
    setSearchData((await searchWords(value)).ssrSearchData)
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

        <div class={styles.left_box}>
          <Show when={searchData().length > 0} fallback={<>
            <Skeleton />
            {/* <Skeleton active={loading} />
              <Skeleton active={loading} />
              <Skeleton active={loading} />
              <Skeleton active={loading} /> */}
            左侧空白
          </>}>

            <For each={searchData()}>
              {
                (ziItem) => {
                  return <>
                    <h1>{ziItem.zi}</h1>

                    <For each={ziItem.fangyan}>
                      {
                        (fangyanItem) => {
                          return <>
                            <h4 style={{ display: 'inline-block', border: '1px solid red', 'border-radius': '2px', 'margin-right': '5px', padding: '0 2px', }}>{fangyanItem.mingzi}</h4>
                            <For each={fangyanItem.yin}>
                              {
                                (yinItem) => {
                                  return <h4 style={{ display: 'inline-block' }}>{yinItem.shengmu + yinItem.yunmu}</h4>
                                }
                              }
                            </For>

                          </>
                        }
                      }
                    </For>
                  </>
                }
              }
            </For>
          </Show>
        </div>
        <div class={styles.right_box}>
          <Show when={searchData().length > 0} fallback={<>
            {/* <Skeleton.Image active={loading} style={{ marginBottom: 20 }} />
              <Skeleton active={loading} /> */}
            右侧空白
          </>}>
            <For each={searchData()}>
              {
                (ziItem) => {
                  return <>
                    <img src={ziItem.zitu} class={styles.zitu} />
                    <div innerHTML={makeBr(ziItem.xinhuashiyi)}></div>
                  </>
                }
              }
            </For>
          </Show>
        </div>
      </Show>
      <Show when={!searchParams.q || searchDataIsEmpty()}>
        <NoData />
      </Show>
    </div>

  </>
}


export default Search
