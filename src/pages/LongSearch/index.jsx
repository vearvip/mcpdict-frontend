import styles from './index.module.less';
import { createSignal, Show } from 'solid-js';
import settingPng from '@/assets/svg/setting.svg';
import NoData from '@/components/NoData';
import LogoBlock from "@/components/LogoBlock";

/**
 * 长文搜索组件，用于处理长文本的注音搜索。
 *
 * @param {Object} props - 组件属性。
 */
const LongSearch = (props) => {
  const [loading, setLoading] = createSignal(false);

  return (
    <>
      <div className={styles.search_bar}>
        <div className={styles.logo_block}><LogoBlock /></div>
        <textarea 
          placeholder="长文注音，单次只可选择一种语言，请在右侧设置按钮选择语言" 
          maxLength={200} 
          className={styles.textarea}
        />
        <div className={styles.btn_box}>
          <button className={styles.setting_btn}>
            <img src={settingPng} alt="设置" />
          </button>
          <br />
          <button className={styles.search_btn}>搜索</button>
        </div>
      </div>
      <div className={styles.search_content}>
        <Show when={false}>
          <div className={styles.search_content_main}>
            {/* <div dangerouslySetInnerHTML={{ __html: data1 }}></div> */}
            {/* <Skeleton active={loading} />
              <Skeleton active={loading} />
              <Skeleton active={loading} />
              <Skeleton active={loading} /> */}
            搜索结果
          </div>
        </Show>
        <Show when={true}>
          <NoData />
        </Show>
      </div>
    </>
  );
};

export default LongSearch;