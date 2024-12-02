import { ParentComponent } from 'solid-js';
import styles from '../../index.module.less'; // 引入 CSS Module

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

  return (
    <div class={styles.auto_fit_text} style={{
      'font-size': getFontSize(props?.text?.length ?? 6),
    }}>
      {props.text}
    </div>
  );
}

export default AutoFitText;