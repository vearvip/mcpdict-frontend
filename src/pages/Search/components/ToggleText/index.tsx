import { Component, createEffect, createSignal, JSX, ParentComponent, Ref } from 'solid-js';
import styles from '../../index.module.less'; // 引入 CSS Module

const ToggleText: ParentComponent<{
  char: string | JSX.Element;
}> = (props) => {
  const [isExpanded, setIsExpanded] = createSignal(true);

  // 切换展开和收起
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded());
  };
  

  return (
    <div class={styles.toggle_text}>
      <div class={styles.char}>
        {
          props.char
        }
        <div class={styles.operate} onClick={toggleExpansion}>

          {
            isExpanded()
              ? <i class="bi bi-chevron-up" />
              : <i class="bi bi-chevron-down" />
          }

        </div>
      </div>
      <p
        class={`${styles.animated_text}`}
        style={{
          height: isExpanded() ? 'auto' : '0px',
        }}
      >
        {props.children}
      </p>
    </div>
  );
};

export default ToggleText;