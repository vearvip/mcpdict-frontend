import React from 'react';
import styles from './index.module.less';
import { processColors } from '../../utils';

/**
 * 图书组件属性接口，定义了图书组件接收的属性。
 *
 * @typedef {Object} BookProps
 * @property {string} [color] - 图书背景渐变颜色，默认值为空字符串。
 * @property {string} name - 图书名称，必须提供。
 * @property {React.CSSProperties} [style] - 自定义样式，默认为空对象。
 */

/**
 * 图书组件，用于展示一个带有装饰线条和渐变背景的图书元素。
 *
 * @param {BookProps} props - 组件属性。
 */
const Book = (props) => {
  const { color = '', name, style = {} } = props;

  return (
    <div className={styles.book_container} style={{ 
      background: `linear-gradient(100deg, ${color.replace(',', ', ')}, #f9f9f9)`,
      ...style
    }}>
      <div className={styles.book_name_container}>
        <div className={styles.book_name}>
          {name.split('').map((ele, index) => (
            <span key={index} className={styles.text_span}>{ele}</span>
          ))}
        </div>
      </div>
      <div className={styles.book_name_border} style={{
        border: `8px solid ${processColors(color)}`,
      }}>
        <div className={styles.book_name_no_use}>
          {name.split('').map((ele, index) => (
            <span key={index} className={styles.text_span}>{ele}</span>
          ))}
        </div>
      </div>
      <div className={styles.book_ver_line} />
      <div className={styles.book_hor_line1} />
      <div className={styles.book_hor_line2} />
      <div className={styles.book_hor_line3} />
      <div className={styles.book_hor_line4} />
    </div>
  );
};

export default Book;
