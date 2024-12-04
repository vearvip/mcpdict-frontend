import { createEffect, createMemo, createSignal, For, onMount, Show } from 'solid-js';
import styles from '../../index.module.less'; // 引入 CSS Module
import Skeleton from "@/components/Skeleton";
import { makeBr } from "@/utils";
 

/**
 * 右侧盒子组件，用于展示搜索数据。 
 */
const RightBox = (props) => {
  const { searchData } = props;

  console.log('searchData', searchData);

  return (
    <>
      <div class={styles.right_box}>
        <Show when={searchData.length > 0} fallback={<>
          {/* <Skeleton.Image active={loading} style={{ marginBottom: 20 }} />
            <Skeleton active={loading} /> */}
          右侧空白
        </>}>
          <For each={searchData}>
            {(ziItem) => (
              <div class={styles.zi_box}>
                <img src={ziItem.zitu} class={styles.zitu} alt="字符图" />
                <div dangerouslySetInnerHTML={{ __html: makeBr(ziItem.xinhuashiyi) }}></div>
              </div>
            )}
          </For>
        </Show>
      </div>
    </>
  );
};

export default RightBox;