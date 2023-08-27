import { Component, createEffect, createMemo, createSignal, For, onMount, Show } from 'solid-js'
import styles from '../../index.module.less'
import Skeleton from "@/components/Skeleton";
import { Zi } from "@/types";

interface LeftBoxProps {
  searchData: Zi[]
}

const LeftBox: Component<LeftBoxProps> = (props) => {
  const {
    searchData
  } = props

  return <>

    <div class={styles.left_box}>
      <Show when={searchData.length > 0} fallback={<>
        <Skeleton />
        {/* <Skeleton active={loading} />
              <Skeleton active={loading} />
              <Skeleton active={loading} />
              <Skeleton active={loading} /> */}
        左侧空白
      </>}>

        <For each={searchData}>
          {
            (ziItem) => {
              return <div class={styles.zi_box}>
                <div class={styles.zi}>{ziItem.zi}</div>

                <For each={ziItem.fangyan}>
                  {
                    (fangyanItem) => {
                      return <div class={styles.fangyan}>
                        <div class={styles.mingzi_box}><div class={styles.mingzi}>{fangyanItem.mingzi}</div></div>
                        <div class={styles.yin_box}>
                        <For each={fangyanItem.yin}>
                          {
                            (yinItem) => {
                              return <div class={styles.yin}>{yinItem.shengmu + yinItem.yunmu + yinItem.shengdiao}</div>
                            }
                          }
                        </For>
                        </div>

                      </div>
                    }
                  }
                </For>
              </div>
            }
          }
        </For>
      </Show>
    </div>

  </>
}


export default LeftBox
