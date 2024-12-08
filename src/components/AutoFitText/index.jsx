import styles from './index.module.less'; // 引入 CSS Module
import useStore from '@/store';
import { JianCheng, YinDianYanSe } from '@/utils/constant';
import DialectDropdown from '../DialectDropdown';
import { showDialectInfo } from '../DialectInfo';
import { copy } from '../../utils';
/**
 * 自适应文本组件，根据文本长度调整字体大小，并设置背景颜色或渐变。
 *
 * @param {Object} props - 组件属性。
 * @param {string} props.char - char
 * @param {string} props.dialectName - dialectName
 * @param {string[]} props.phonetics - phonetics
 * @param {React.CSSProperties} props.style - 要显示的文本。
 * @param {Function} props.onClick - 点击事件
 */
const AutoFitText = (props) => {
  const { store } = useStore()

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
   * @param {string} dialectName - 文本内容。
   * @returns {string} 对应的背景颜色。
   */
  const getBackgroundColor = (dialectName) => {
    return dialectName
      ? (store.dialectInfos.find(ele => ele[JianCheng] === dialectName)?.[YinDianYanSe])
      : undefined;
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

  const handleDialectDropdownClick = value => {
    console.log('value', value)
    if (value.key === 'see_dialect_detail') {
      showDialectInfo({
        color: bgColor,
        dialectName: props.dialectName
      })
    } else if (value.key === 'copy_char_phonetic_now') {
      copy((props.phonetics || []).join(' '))
    } else if (value.key === 'copy_char') {
      copy(props.char)
    }
  }

  const bgColor = generateColorOrGradient(getBackgroundColor(props.dialectName))

  return (

    <DialectDropdown
      char={props.char}
      dialectName={props.dialectName} 
      onClick={handleDialectDropdownClick}>
      <div
        className={styles.auto_fit_text}
        style={{
          'fontSize': getFontSize(props?.dialectName?.length ?? 6),
          "background": bgColor,
          ...props.style
        }}
      >
        {props.dialectName}
      </div>
    </DialectDropdown>
  );
};

export default AutoFitText;