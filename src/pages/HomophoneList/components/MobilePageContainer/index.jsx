import React, { useState, useEffect, useRef } from "react";

const MobilePageContainer = ({ children, title }) => {
  const childrenArray = React.Children.toArray(children);
  const [layout, setLayout] = useState([]);
  const containerRef = useRef(null);
  const childRefs = useRef([]);

  // 配置参数
  const pagePadding = [24, 16];
  const columnGap = 12;
  const titleHeight = 40;

  // 动态尺寸状态
  const [dimensions, setDimensions] = useState({
    width: 320,
    height: 568
  });

  // 计算列宽
  const columnWidth = (dimensions.width - pagePadding[1] * 2 - columnGap) / 2;

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height
        });
      }
    };
    
    updateDimensions();
    const ro = new ResizeObserver(updateDimensions);
    containerRef.current && ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const calculateLayout = () => {
      const heights = childRefs.current.map(ref => ref?.offsetHeight || 0);
      const newLayout = [];
      let currentPage = { left: 0, right: 0, pageHeight: 0 };

      heights.forEach((height, index) => {
        // 计算当前页最大高度
        const pageHeight = Math.max(currentPage.left, currentPage.right);
        
        // 检查当前页是否可容纳
        if (Math.max(currentPage.left + height, currentPage.right) <= dimensions.height) {
          // 优先左列
          if (currentPage.left <= currentPage.right) {
            newLayout[index] = { 
              top: currentPage.left,
              column: 0
            };
            currentPage.left += height;
          } else {
            newLayout[index] = {
              top: currentPage.right,
              column: 1
            };
            currentPage.right += height;
          }
        } else {
          // 创建新页面
          currentPage = { 
            left: height, 
            right: 0,
            pageHeight: height
          };
          newLayout[index] = {
            top: 0,
            column: 0
          };
        }
        
        currentPage.pageHeight = Math.max(currentPage.left, currentPage.right);
      });

      setLayout(newLayout);
    };

    calculateLayout();
  }, [children, dimensions]);

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: '#fff',
        overflowX: 'hidden',
        overflowY: 'auto'  // 启用垂直滚动
      }}
    >
      {/* 测量容器 */}
      <div style={{
        visibility: 'hidden',
        position: 'absolute',
        width: `${columnWidth}px`,
        left: '-9999px'
      }}>
        {childrenArray.map((child, i) => (
          <div key={`m-${i}`} ref={el => childRefs.current[i] = el}>
            {child}
          </div>
        ))}
      </div>

      {/* 主内容容器 */}
      <div style={{
        padding: `${pagePadding[0]}px ${pagePadding[1]}px`,
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}>
        {/* 标题 */}
        <div style={{
          height: titleHeight,
          marginBottom: 16,
          fontSize: '1.2rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {title}
        </div>

        {/* 双列布局容器 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `1fr ${columnGap}px 1fr`,
          minHeight: `calc(100vh - ${titleHeight + pagePadding[0] * 2}px)`,
          paddingLeft: '9vw'
        }}>
          {/* 左列 */}
          <div style={{ position: 'relative' }}>
            {childrenArray.map((child, i) => {
              const pos = layout[i];
              if (pos?.column === 0) {
                return (
                  <div 
                    key={i}
                    style={{
                      position: 'relative',
                      marginBottom: columnGap,
                      width: '100%'
                    }}
                  >
                    {child}
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* 间隔 */}
          <div />

          {/* 右列 */}
          <div style={{ position: 'relative' }}>
            {childrenArray.map((child, i) => {
              const pos = layout[i];
              if (pos?.column === 1) {
                return (
                  <div 
                    key={i}
                    style={{
                      position: 'relative',
                      marginBottom: columnGap,
                      width: '100%'
                    }}
                  >
                    {child}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePageContainer;