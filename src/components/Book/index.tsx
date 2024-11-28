import styles from './index.module.less'
import { Component, For, JSX } from 'solid-js'


interface BookProps {
  color?: string;
  name: string;
  style?: JSX.CSSProperties
}

const Book: Component<BookProps> = (props) => {
  const { color, name, style = {} } = props; 

  return (
    <div class={styles.book_container} style={{ 
      background: `linear-gradient(100deg, ${color} , #f9f9f9)`,
      ...style
    }}>
      <div class={styles.book_name_container}>
        <div class={styles.book_name}>
          {/* {name.split("").map((ele) => (
            <span class={styles.text_span}>
              {ele}
            </span>
          ))} */}
          <For each={name.split("")} fallback={<div>Loading...</div>}>
            {(ele) => <span class={styles.text_span}>
              {ele}
            </span>}
          </For>
        </div>
      </div>
      <div class={styles.book_name_border} style={{
        border: `8px solid ${color}`,
      }}> 
        <div class={styles.book_name_no_use}>
          {/* {name.split("").map((ele) => (
            <span  class={styles.text_span}>
              {ele}
            </span>
          ))} */}
          <For each={name.split("")} fallback={<div>Loading...</div>}>
            {(ele) => <span class={styles.text_span}>
              {ele}
            </span>}
          </For>
        </div>
      </div>
      <div class={styles.book_ver_line} />
      <div class={styles.book_hor_line1} />
      <div class={styles.book_hor_line2} />
      <div class={styles.book_hor_line3} />
      <div class={styles.book_hor_line4} />
    </div>
  );
}

export default Book;
