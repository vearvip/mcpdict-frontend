import styles from './index.module.less';
import { For } from 'solid-js';

/**
 * 图书组件属性接口，定义了图书组件接收的属性。
 *
 * @typedef {Object} BookProps
 * @property {string} [color] - 图书背景渐变颜色，默认值为空字符串。
 * @property {string} name - 图书名称，必须提供。
 * @property {import("solid-js").JSX.CSSProperties} [style] - 自定义样式，默认为空对象。
 */

/**
 * 图书组件，用于展示一个带有装饰线条和渐变背景的图书元素。
 *
 * @param {BookProps} props - 组件属性。
 */
const Book = (props) => {
  const { color = '', name, style = {} } = props;

  return (
    <div class={styles.book_container} style={{ 
      background: `linear-gradient(100deg, ${color}, #f9f9f9)`,
      ...style
    }}>
      <div class={styles.book_name_container}>
        <div class={styles.book_name}>
          <For each={name.split('')} fallback={<div>Loading...</div>}>
            {(ele) => (
              <span class={styles.text_span}>{ele}</span>
            )}
          </For>
        </div>
      </div>
      <div class={styles.book_name_border} style={{
        border: `8px solid ${color}`,
      }}>
        <div class={styles.book_name_no_use}>
          <For each={name.split('')} fallback={<div>Loading...</div>}>
            {(ele) => (
              <span class={styles.text_span}>{ele}</span>
            )}
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
};

export default Book;