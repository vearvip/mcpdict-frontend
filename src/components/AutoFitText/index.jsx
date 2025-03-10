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
 * @param {React.CSSProperties} props.style - 样式
 * @param {Function} props.onClick - 点击事件
 * @param {Function} props.onlyName - 只展示方言名
 */
const AutoFitText = (props) => {
  const { store } = useStore()

  const bgColor = getBackgroundColorByName(props.dialectName, store.dialectInfos)
  /**
   * 字体大小映射表，根据文本长度选择合适的字体大小。
   * @type {{ [key: number]: string }}
   */
  const fontSizeMap = {
    10: '6px',
    9: '7px',
    8: '8px', // 乃至7个字以上
    7: '9px', // 这辈子没想到有的方言名能达到7个字
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

// 定义一个函数来生成完整的URL并新开一个标签页
const openInNewTab = (path, params) => {
  // 获取当前页面的域名
  const currentDomain = window.location.origin;
  
  // 构造完整的URL
  let url = `${currentDomain}/#/${path}`;
  
  // 如果有参数，则将其添加到URL后面
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    url += queryString ? `?${queryString}` : '';
  }

  // 使用 window.open 在新标签页打开URL
  window.open(url, '_blank');
};

  const handleDialectDropdownClick = value => {
    // console.log('value', value)
    if (value.key === 'see_dialect_detail') {
      showDialectInfo({
        color: bgColor,
        dialectName: props.dialectName
      })
    } else if (value.key === 'copy_char_phonetic_now') {
      copy((props.phonetics || []).join(' '))
    } else if (value.key === 'copy_char') {
      copy(props.char)
    } else if (value.key === 'see_dialect_homephone_list') {
      openInNewTab('/homophoneList', {
        dialectName: props.dialectName
      })
    }
  }

  const dialectElement = <div
    className={styles.auto_fit_text}
    style={{
      'fontSize': getFontSize(props?.dialectName?.length ?? 6),
      "background": generateColorOrGradient(bgColor),
      ...props.style
    }}
  >
    {props.dialectName}
  </div>

  return props.onlyName
    ? <div onClick={() => {
      showDialectInfo({
        color: bgColor,
        dialectName: props.dialectName
      })
    }}>{dialectElement}</div>
    : <DialectDropdown
      char={props.char}
      dialectName={props.dialectName}
      onClick={handleDialectDropdownClick}>
      {dialectElement}
    </DialectDropdown>

};

export default AutoFitText;
