// index.js 或 App.js 的最顶部
import { useEffect, useRef } from 'react'; 
import { useNavigate } from 'react-router';

// 兼容逻辑：只在页面加载时执行一次
function HashRouterCompatibility() {
  const navigate = useNavigate();
  const hasExecuted = useRef(false);

  useEffect(() => {
    // 确保只执行一次
    if (hasExecuted.current) {
      return;
    }
    hasExecuted.current = true;

    const url = window.location.href;
    
    // 检查是否包含 /#/ 格式的 hash 路由
    const hashIndex = url.indexOf('/#/');
    if (hashIndex !== -1) {
      // 提取 hash 后的路径（如 /#/user/profile → /user/profile）
      let hashPath = url.slice(hashIndex + 2); // +2 是跳过 '/#'
      
      // URL解码
      try {
        hashPath = decodeURIComponent(hashPath);
      } catch (e) {
        console.warn('Failed to decode hash path:', hashPath);
      }
      
      // 验证路径是否有效（不为空且以/开头）
      if (hashPath && hashPath.startsWith('/')) {
        // 使用 navigate.replace 替换当前历史记录，不留下后退入口
        navigate(hashPath, { replace: true });
      } else if (hashPath === '') {
        // 如果hash路径为空，跳转到根路径
        navigate('/', { replace: true });
      } else {
        // 如果路径无效，跳转到根路径
        console.warn('Invalid hash path:', hashPath);
        navigate('/', { replace: true });
      }
    }
    // 如果没有 hash，不做任何事，让 Router 自己处理
  }, []); // 空依赖数组，确保只在组件挂载时执行一次

  return null; // 这个组件不渲染任何内容
}

export default HashRouterCompatibility;