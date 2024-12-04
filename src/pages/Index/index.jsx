import Book from "@/components/Book";
import SearchInput from "@/components/SearchInput";
import logo from '@/assets/webp/logo.webp';
import styles from "./index.module.less";
import { useNavigate } from "@solidjs/router"; 

/**
 * 主页组件，用于展示主页内容，包括 Logo 和搜索输入框。
 *
 * @param {Object} props - 组件属性。
 */
const Index = (props) => {
  const push = useNavigate();

  /**
   * 处理搜索动作，通过更新 URL 来设置新的搜索查询。
   *
   * @param {any} value - 要搜索的值。
   */
  const onSearch = async (value) => {
    push('/search?q=' + value);
  };

  return (
    <div class={styles.index}>
      <div class={`${styles.main_box} box`}>
        <div class={styles.logo_box}>
          <img class={styles.logo} src={logo} alt="Logo" />
        </div>
        <SearchInput 
          style={{
            'margin-top': '100px'
          }} 
          onSearch={onSearch}
        />
      </div>
      {/* <div class={styles.book_box}>
        <Divider class={styles.book_divider}>已收录方言</Divider>
        <For each={langs()}>
          {(ele) => {
            return <div class={styles.book_item}>
              <Book name={ele.name} color={ele.color} />
            </div>;
          }}
        </For> 
      </div> */}
    </div>
  );
};

export default Index;