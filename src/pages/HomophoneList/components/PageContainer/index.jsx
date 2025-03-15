import React, { useState, useEffect, useRef } from "react";

const PageContainer = ({ children, title }) => {
  const childrenArray = React.Children.toArray(children);
  const [layout, setLayout] = useState([]);
  const childRefs = useRef([]);

  // 页面尺寸配置
  const pageWidth = 970;
  const pageHeight = 1373;
  const pagePadding = [120, 140];
  const columnGap = 34;
  const titleHeight = 60; // 新增标题高度

  // 计算内容区域尺寸
  const contentWidth = pageWidth - pagePadding[1] * 2;
  const contentHeight = pageHeight - pagePadding[0] * 2;
  const columnWidth = (contentWidth - columnGap) / 2;

  useEffect(() => {
    const calculateLayout = () => {
      const heights = childRefs.current.map((ref) => ref?.clientHeight || 0);
      const newLayout = [];
      const pages = [];

      let currentPage = {
        left: 0,
        right: 0,
        globalY: 0,
      };
      pages.push(currentPage);

      heights.forEach((height, index) => {
        while (true) {
          const currentPageIndex = pages.length - 1;
          // 计算可用高度（第一页要减去标题高度）
          const availableHeight =
            currentPageIndex === 0
              ? contentHeight - titleHeight
              : contentHeight;

          // 尝试在左列放置
          if (currentPage.left + height <= availableHeight) {
            newLayout[index] = {
              pageIndex: currentPageIndex,
              column: 0,
              top: currentPage.left,
            };
            currentPage.left += height;
            currentPage.globalY = Math.max(
              currentPage.globalY,
              currentPage.left
            );
            break;
          }

          // 尝试在右列放置
          if (currentPage.right + height <= availableHeight) {
            newLayout[index] = {
              pageIndex: currentPageIndex,
              column: 1,
              top: currentPage.right,
            };
            currentPage.right += height;
            currentPage.globalY = Math.max(
              currentPage.globalY,
              currentPage.right
            );
            break;
          }

          // 创建新页面
          currentPage = {
            left: 0,
            right: 0,
            globalY: 0,
          };
          pages.push(currentPage);
        }
      });

      setLayout(newLayout);
    };

    calculateLayout();
  }, [children]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* 测量容器 */}
      <div
        style={{
          visibility: "hidden",
          position: "absolute",
          left: "-9999px",
          width: `${columnWidth}px`,
        }}
      >
        {childrenArray.map((child, i) => (
          <div key={`m-${i}`} ref={(el) => (childRefs.current[i] = el)}>
            {child}
          </div>
        ))}
      </div>

      {/* 渲染页面 */}
      {Array.from({
        length: Math.max(...layout.map((l) => l?.pageIndex || 0)) + 1,
      }).map((_, pageIndex) => (
        <div
          key={pageIndex}
          style={{
            width: `${pageWidth}px`,
            height: `${pageHeight}px`,
            padding: `${pagePadding[0]}px ${pagePadding[1]}px`,
            paddingLeft: "10vw",
            marginBottom: "20px",
            boxSizing: "border-box",
            position: "relative",
            backgroundColor: "white",
            boxShadow: "0px 0px 22px 2px rgba(209,209,209,0.77)",
          }}
        >
          {/* 标题（仅第一页显示） */}
          {pageIndex === 0 && (
            <div
              style={{
                position: "absolute",
                top: pagePadding[0],
                left: pagePadding[1],
                width: `${contentWidth}px`,
                height: `${titleHeight}px`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
                fontWeight: "bold",
                zIndex: 1,
              }}
            >
              {title}
            </div>
          )}

          {/* 内容容器 */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: `${contentHeight}px`,
              // 第一页内容向下偏移标题高度
              marginTop: pageIndex === 0 ? titleHeight : 0,
            }}
          >
            {/* 左列 */}
            <div
              style={{
                position: "absolute",
                left: 0,
                width: `${columnWidth}px`,
              }}
            >
              {childrenArray.map((child, i) => {
                const pos = layout[i];
                if (pos?.pageIndex === pageIndex && pos.column === 0) {
                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        // 第一页需要增加标题高度偏移
                        top: `${
                          pos.top + (pageIndex === 0 ? titleHeight : 0)
                        }px`,
                        width: "100%",
                      }}
                    >
                      {child}
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* 右列 */}
            <div
              style={{
                position: "absolute",
                left: columnWidth + columnGap,
                width: `${columnWidth}px`,
              }}
            >
              {childrenArray.map((child, i) => {
                const pos = layout[i];
                if (pos?.pageIndex === pageIndex && pos.column === 1) {
                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        // 第一页需要增加标题高度偏移
                        top: `${
                          pos.top + (pageIndex === 0 ? titleHeight : 0)
                        }px`,
                        width: "100%",
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
      ))}
    </div>
  );
};

export default PageContainer;
