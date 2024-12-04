import styles from '../../index.module.less'; // 引入 CSS Module
import { store } from '@/store';
import { JC, YDYS } from '@/utils/constant';

/**
 * 自适应文本组件，根据文本长度调整字体大小，并设置背景颜色或渐变。
 *
 * @param {Object} props - 组件属性。
 * @param {string} props.text - 要显示的文本。
 */
const AutoFitText = (props) => {

  /**
   * 字体大小映射表，根据文本长度选择合适的字体大小。
   * @type {{ [key: number]: string }}
   */
  const fontSizeMap = {
    7: '9px',
    6: '10px',
    5: '11px',
    4: '12px',
    3: '13px',
    2: '14px',
    1: '14px',
  };

  /**
   * 根据文本长度获取对应的字体大小。
   *
   * @param {number} length - 文本长度。
   * @returns {string} 对应的字体大小。
   */
  const getFontSize = (length) => {
    return fontSizeMap[Math.min(length, 7)] || fontSizeMap[6];
  };

  /**
   * 根据文本内容获取背景颜色。
   *
   * @param {string} text - 文本内容。
   * @returns {string} 对应的背景颜色。
   */
  const getBackgroundColor = (text) => {
    return store.dialectInfos.find(ele => ele[JC] === text)?.[YDYS] ?? '#ccc';
  };

  /**
   * 生成颜色或线性渐变字符串。
   *
   * @param {string} colorString - 颜色字符串，可以是单一颜色或者逗号分隔的颜色列表。
   * @returns {string} 单一颜色值或线性渐变字符串。
   */
  function generateColorOrGradient(colorString) {
    // 清除可能存在的多余空格并分割颜色值
    const colors = colorString.replace(/\s+/g, '').split(',');

    // 检查是否只有一个颜色
    if (colors.length === 1) {
      return colors[0];
    }

    // 如果有多个颜色，则创建CSS线性渐变字符串，从左到右
    const gradientParts = colors.map((color, index) => `${color} ${index * (100 / (colors.length - 1))}%`);
    return `linear-gradient(to right, ${gradientParts.join(', ')})`;
  }

  return (
    <div
      onClick={() => {
        console.log('store', generateColorOrGradient(getBackgroundColor(props.text)));
      }}
      class={styles.auto_fit_text}
      style={{
        'font-size': getFontSize(props?.text?.length ?? 6),
        "background": generateColorOrGradient(getBackgroundColor(props.text)),
      }}>
      {props.text}
    </div>
  );
};

export default AutoFitText;