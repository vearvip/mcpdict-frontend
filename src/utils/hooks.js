import { useSize } from "ahooks";
import { useState, useEffect } from 'react';

export function usePad() {
  const size = useSize(document.querySelector("body"));
  return size.width <= 992;
}

export function useMobile() {
  const size = useSize(document.querySelector("body"));
  return size.width <= 768;
}


export function useWindowSize() {
  // 初始化状态，用于存储窗口的宽度和高度
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // 当窗口大小改变时调用的处理函数
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,   // 获取当前窗口的宽度
        height: window.innerHeight, // 获取当前窗口的高度
      });
    }

    // 添加事件监听器，监听窗口大小的变化
    window.addEventListener('resize', handleResize);

    // 立即调用处理函数，以确保状态初始化为当前窗口尺寸
    handleResize();

    // 组件卸载或依赖项变化时移除事件监听器，防止内存泄漏
    return () => window.removeEventListener('resize', handleResize);
  }, []); // 空数组确保该副作用仅在组件挂载和卸载时执行

  // 返回当前窗口的尺寸
  return windowSize;
}