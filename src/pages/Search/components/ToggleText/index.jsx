import React, { useState } from 'react';
import styles from '../../index.module.less'; // 引入 CSS Module
import { UpOutlined,DownOutlined } from '@ant-design/icons'

/**
 * 切换文本组件，用于展示可以展开和收起的文本内容。
 *
 * @param {Object} props - 组件属性。
 * @param {string | React.ReactNode} props.char - 要显示的字符或 JSX 元素。
 */
const ToggleText = (props) => {
  const [isExpanded, setIsExpanded] = useState(true);

  /**
   * 切换展开和收起状态。
   */
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.toggle_text}>
      <div className={styles.char}>
        {props.char}
        <div className={styles.operate} onClick={toggleExpansion}>
          {isExpanded
            ? <UpOutlined />
            : <DownOutlined />}
        </div>
      </div>
      <p
        className={`${styles.animated_text}`}
        style={{
          height: isExpanded ? 'auto' : '0px',
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
