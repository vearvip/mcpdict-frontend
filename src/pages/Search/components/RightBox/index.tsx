import { Component, createEffect, createMemo, createSignal, For, onMount, Show } from 'solid-js'
import styles from '../../index.module.less' 
import Skeleton from "@/components/Skeleton";  
import { makeBr } from "@/utils";

interface RightBoxProps {
  searchData: any
}

const RightBox: Component<RightBoxProps> = (props) => { 
  const {
    searchData
  } = props

  console.log('searchData', searchData)

  return <>
<div class={styles.right_box}>
          <Show when={searchData.length > 0} fallback={<>
            {/* <Skeleton.Image active={loading} style={{ marginBottom: 20 }} />
              <Skeleton active={loading} /> */}
            右侧空白
          </>}>
            <For each={searchData}>
              {
                (ziItem) => {
                  return <div class={styles.zi_box}>
                    <img src={ziItem.zitu} class={styles.zitu} />
                    <div innerHTML={makeBr(ziItem.xinhuashiyi)}></div>
                  </div>
                }
              }
            </For>
          </Show>
        </div>
  </>
}


export default RightBox
