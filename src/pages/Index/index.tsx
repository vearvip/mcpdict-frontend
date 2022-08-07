  
import Book from "@/components/Book";
import SearchInput from "@/components/SearchInput";
import { logo, logoText } from '@/utils/asstes'; 
import styles from "./index.module.less"; 
import { useNavigate } from "@solidjs/router";
import { Component, createSignal, For, onMount } from "solid-js";
import { Lang } from "@/types";
import { queryLangs } from "@/services";
  

const Index: Component = (props) => { 
  const [langs, setLangs] = createSignal<Lang[]>([]);
  const push = useNavigate();

  const onSearch = async (value: any) => {
    push('/search?q=' + value) 
  }

  onMount(async () => {
    const data = await queryLangs()
    setLangs(data.langs)
    // console.log('data', data)
  })

  return (
    <div class={styles.index}>
      <div class={`${styles.main_box} box`}>
        <div class={styles.logo_box}>
          <img class={styles.logo} src={logo} />
          <img class={styles.logo_text} src={logoText} />
        </div>
        <SearchInput style={{
          'margin-top': '100px'
        }} onSearch={onSearch} />
      </div>
      <div class={styles.book_box}>
        {/* <Divider class={styles.book_divider}>已收录方言</Divider> */}
        <For each={langs()}>
          {(ele) => {
            return <div class={styles.book_item}>
            <Book name={ele.name} color={ele.color} />
          </div>
          }}
        </For> 
      </div>
    </div>
  );
};

 

export default Index;
