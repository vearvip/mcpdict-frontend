// CollapsibleContent.jsx
import React, { useState, useEffect } from 'react';
import styles from './index.module.less';
import { DownOutlined } from '@ant-design/icons';

const CollapsibleContent = ({ children, height }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentHeight = isExpanded ? 'auto' : height;
  
  // useEffect(() => {
  //   console.log('isExpanded', isExpanded)
  // }, [isExpanded])

  return (
    <div className={styles.collapsible_content} style={{ height: contentHeight }}>
 
      {children}
      {!isExpanded && (
        <div className={styles.gradient_overlay}>
          <div className={styles.expand_button} onClick={() => setIsExpanded(true)}>
            展开更多<DownOutlined />
          </div>
        </div>
      )}
    </div>
  );
};

export default CollapsibleContent;