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

  function parseDialectData(data: {
    [key: string]: any
  }) {
    const parsedData = [];

    for (const [dialectName, infoString] of Object.entries(data)) {
      const infos = [];
      // 按照 '\t' 分割字符串
      const entries = infoString.split('\t');

      for (const entry of entries) {
        // 查找音标和释义之间的分隔符（通常是第一个出现的大括号）
        const bracketIndex = entry.indexOf('{');
        let phonetic;
        let explain;

        if (bracketIndex !== -1) {
          // 如果有大括号，则分割音标和释义，并去除花括号
          phonetic = entry.substring(0, bracketIndex).trim();
          explain = entry.substring(bracketIndex + 1, entry.length - 1).trim(); // 去除花括号
        } else {
          // 如果没有大括号，则整个条目视为音标，释义为空
          phonetic = entry.trim();
          explain = '';
        }

        // 将音标和释义添加到infos数组中
        if (phonetic) { // 确保音标不为空
          infos.push({ phonetic, explain });
        }
      }

      // 添加解析后的信息到最终结果数组中
      parsedData.push({ dialectName, infos });
    }

    return parsedData;
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
              // const charInfos = fmtCharInfo(charItem.charInfo)
              const charInfos = parseDialectData(charItem.charInfo)
              return <div class={styles.char_box}>

                <ToggleText char={charItem.char}>

                  <For each={charInfos}>
                    {
                      (charInfo) => {
                        return <div class={styles.char_info}>
                          {/* <div class={styles.dialect_box}><div class={styles.dialect}>{charInfo.dialect}</div></div> */}
                          <AutoFitText text={charInfo.dialectName} />
                          <div >
                            <For each={charInfo.infos}>
                              {
                                (info) => {
                                  return <div class={styles.info_item}>
                                    <span class={styles.phonetic}>{info.phonetic}</span>
                                    <span class={styles.explain}>{info.explain}</span>
                                  </div>
                                }
                              }
                            </For>
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
