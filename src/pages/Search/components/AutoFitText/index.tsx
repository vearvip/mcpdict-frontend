import { ParentComponent } from 'solid-js';
import styles from '../../index.module.less'; // 引入 CSS Module
import { store } from '@/store';
import { JC, YDYS } from '@/types';

const AutoFitText: ParentComponent<{
  text: string;
}> = function (props) {


  const fontSizeMap: { [key: number]: string } = {
    7: '9px',
    6: '10px',
    5: '11px',
    4: '12px',
    3: '13px',
    2: '14px',
    1: '14px',
  };

  const getFontSize = (length: number): string => {
    return fontSizeMap[Math.min(length, 7)] || fontSizeMap[6];
  };

  const getBackgroundColor = (text: string): string => {
    return store.dialectInfos.find(ele => ele[JC] === text)?.[YDYS] ?? '#ccc'
  };
  function generateColorOrGradient(colorString: string) {
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
        console.log('store', generateColorOrGradient(getBackgroundColor(props.text)))
      }}
      class={styles.auto_fit_text}
      style={{
        'font-size': getFontSize(props?.text?.length ?? 6),
        "background": generateColorOrGradient(getBackgroundColor(props.text)),
      }}>
        {/* {generateColorOrGradient(getBackgroundColor(props.text))} */}
      {props.text}
    </div>
  );
}

export default AutoFitText;