
import styles from './index.module.less' 
import { logo, logoText } from "@/utils/asstes";  
import { Component, createSignal } from 'solid-js'; 

const LongSearch: Component = (props) => {
  const [loading, setLoading] = createSignal(false) 
  return <> 
    <div class={styles.search_bar}>
      <div class={styles.logo_box}>
        <img class={styles.logo} src={logo as any} />
        <img class={styles.logo_text} src={logoText as any} />
      </div> 
        <textarea placeholder="长文注音，单次只可选择一种语言，请在右侧设置按钮选择语言" maxLength={100} class={styles.input} />
        <div class={styles.btn_box}>
        <button class={styles.setting}> 设置</button>
        <br />
        <button class={styles.search_btn} > 搜索</button>
        </div>
    </div>
    <div class={styles.search_content}>
      <div class={styles.search_content_main}>
        {/* <div dangerouslySetInnerHTML={{ __html: data1 }}></div> */}
        {/* <Skeleton active={loading} />
        <Skeleton active={loading} />
        <Skeleton active={loading} />
        <Skeleton active={loading} /> */}
        搜索结果
      </div> 
    </div>

  </>
}
 

export default LongSearch