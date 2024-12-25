import styles from './index.module.less'; // 引入 CSS Module
import useStore from '@/store';
import DialectDropdown from '../DialectDropdown';
import { showDialectInfo } from '../DialectInfo';
import { copy, generateColorOrGradient, getBackgroundColorByName } from '../../utils';
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

  const bgColor = getBackgroundColorByName(props.dialectName, store.dialectInfos) 
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


  return (

    <DialectDropdown
      char={props.char}
      dialectName={props.dialectName} 
      onClick={handleDialectDropdownClick}>
      <div
        className={styles.auto_fit_text}
        style={{
          'fontSize': getFontSize(props?.dialectName?.length ?? 6),
          "background": generateColorOrGradient(bgColor),
          ...props.style
        }}
      >
        {props.dialectName}
      </div>
    </DialectDropdown>
  );
};

export default AutoFitText;
