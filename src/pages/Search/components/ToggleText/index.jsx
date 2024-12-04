import { createEffect, createSignal } from 'solid-js';
import styles from '../../index.module.less'; // 引入 CSS Module

/**
 * 切换文本组件，用于展示可以展开和收起的文本内容。
 *
 * @param {Object} props - 组件属性。
 * @param {string | import('solid-js').JSX.Element} props.char - 要显示的字符或 JSX 元素。
 */
const ToggleText = (props) => {
  const [isExpanded, setIsExpanded] = createSignal(true);

  /**
   * 切换展开和收起状态。
   */
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded());
  };

  return (
    <div class={styles.toggle_text}>
      <div class={styles.char}>
        {props.char}
        <div class={styles.operate} onClick={toggleExpansion}>
          {isExpanded()
            ? <i class="bi bi-chevron-up" />
            : <i class="bi bi-chevron-down" />}
        </div>
      </div>
      <p
        class={`${styles.animated_text}`}
        style={{
          height: isExpanded() ? 'auto' : '0px',
          overflow: 'hidden', // 确保高度变化时内容不会溢出
          transition: 'height 0.3s ease', // 添加过渡效果以实现平滑动画
        }}
      >
        {props.children}
      </p>
    </div>
  );
};

export default ToggleText;