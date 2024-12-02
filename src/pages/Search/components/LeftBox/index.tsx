import { Component, createEffect, createMemo, createSignal, For, onMount, Show } from 'solid-js'
import styles from '../../index.module.less'; // 引入 CSS Module
import Skeleton from "@/components/Skeleton";
import { SearchData } from '@/types';
import ToggleText from '../ToggleText';
import AutoFitText from '../AutoFitText';
   

interface LeftBoxProps {
  searchData: SearchData
}

const LeftBox: Component<LeftBoxProps> = (props) => {
  const {
    searchData
  } = props

  const fmtCharInfo = (obj: any) => {
    return Object.keys(obj).map(key => {
      const item = {
        dialect: key,
        phonetic: obj[key]
      }
      let phoneticAndexplain
      return item
    })
  }

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
            (charItem) => {
              const charInfos = fmtCharInfo(charItem.charInfo)
              console.log('charInfos', charInfos)
              return <div class={styles.char_box}>
                                  
                <ToggleText char={charItem.char}>

                <For each={charInfos}>
                  {
                    (charInfo) => {
                      return <div class={styles.char_info}>
                        {/* <div class={styles.dialect_box}><div class={styles.dialect}>{charInfo.dialect}</div></div> */}
                        <AutoFitText text={charInfo.dialect} />
                        <div class={styles.phonetic_box}>
                          {charInfo.phonetic}
                          {/* <For each={charInfo.phonetic}>
                          {
                            (yinItem) => {
                              return <div class={styles.yin}>
                                <span class={styles.yinbiao}>{yinItem.shengmu + yinItem.yunmu + yinItem.shengdiao}</span>
                                <For each={yinItem.yongfa}>
                                  {
                                    (yongfaItem) => {
                                      return <span>{
                                        yongfaItem.shiyi + '：' + yongfaItem.zaojv.replaceAll(charItem.zi, '~') + '；'
                                      }</span>
                                    }
                                  }

                                </For>
                              </div>
                            }
                          }
                        </For> */}
                        </div>

                      </div>
                    }
                  }
                </For>
                </ToggleText>

              </div>
            }
          }
        </For>
      </Show>
    </div>

  </>
}


export default LeftBox
