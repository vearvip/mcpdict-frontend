import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { join } from "path";
import { visualizer } from "rollup-plugin-visualizer";
// import cdn from "@vearvip/vite-plugin-cdn-import"

// 自定义Rollup插件用于HTML处理
function injectBaiduAnalyticsPlugin(mode) {
  return {
    name: 'inject-baidu-analytics',
    async transformIndexHtml(html, ctx) {
      const isProduction = mode === 'production'

      if (isProduction) {
        // 百度统计的 <script> 标签
        const baiduAnalyticsScript = `
          <script>
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?ee245bfe8773dc8395fa35a52e8f41cc";
              var s = document.getElementsByTagName("script")[0];
              s.parentNode.insertBefore(hm, s);
            })();
          </script>
        `.trim();

        // 将百度统计的 <script> 标签插入到 <!-- INJECT_SCRIPT --> 占位符处
        html = html.replace('<!-- INJECT_SCRIPT -->', baiduAnalyticsScript);
      }

      return html;
    },
  };
}

export default defineConfig(({ command, mode }) => {
  return {
    esbuild: {
      drop: ['console', 'debugger']
    },
    plugins: [
      react(),
      // cdn({
      //   prodUrl: 'https://cdn.bootcdn.net/ajax/libs/{name}/{version}/{path}',
      //   enableInDevMode: true,
      //   modules: [
      //     'react', 
      //     'react-dom', 
      //     // 'dayjs', 
      //     // 'antd',
      //   ],
      // }), 
      visualizer({
        open: false,
      }),
      injectBaiduAnalyticsPlugin(mode) // 注册自定义百度统计插件
    ],
    resolve: {
      alias: {
        "@": join(__dirname, "src"),
      },
    },
    build: {
      rollupOptions: {
        output: { 
          // 控制资产文件的命名规则
          assetFileNames: ({ name }) => {
            if (typeof name === 'string' && name.endsWith('.ttf')) {
              return 'assets/[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
          // 手动指定 chunk 分割规则
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // 将 rc-component 相关内容放入 vendor-rc-component chunk
              if (id.includes('rc-component')) {
                return 'vendor-rc-component'; 
              }
              // 将 antd 相关内容放入 vendor-antd chunk
              if (id.includes('antd')) {
                return 'vendor-antd'; 
              }
              // 将 react-dom 相关内容放入 vendor-react-dom chunk
              if (id.includes('react-dom')) {
                return 'vendor-react-dom';
              }
              // 将 react 相关内容放入 vendor-react chunk
              if (id.includes('react')) {
                return 'vendor-react';
              }
              // 其他 node_modules 内容放入 vendor chunk
              return 'vendor'; 
            }
          },
        },
      },
    },
  }
});