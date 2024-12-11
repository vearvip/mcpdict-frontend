import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { join } from "path";
import { visualizer } from "rollup-plugin-visualizer";
// import cdn from "vite-plugin-cdn-import";
import cdn from "@vearvip/vite-plugin-cdn-import";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cdn({
      prodUrl: 'https://cdn.bootcdn.net/ajax/libs/{name}/{version}/{path}',
      // enableInDevMode: true,
      modules: [
        'react', 
        'react-dom', 
        'dayjs', 
        'antd',
      ],
    }),
    // cdn({
    //   enableInDevMode: true,
    //   modules: [
    //     {
    //       name: "react-dom",
    //       var: "ReactDOM",
    //       // path: `umd/react-dom.production.min.js`,
    //       // prodUrl: 'https://cdn.jsdelivr.net/npm/{name}@{version}/{path}',
    //       path: 'https://cdn.bootcdn.net/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js'
    //     },
    //     {
    //       name: "react",
    //       var: "React",
    //       // path: `umd/react.production.min.js`,
    //       // prodUrl: 'https://cdn.jsdelivr.net/npm/{name}@{version}/{path}',
    //       path: 'https://cdn.bootcdn.net/ajax/libs/react/18.3.1/umd/react.production.min.js'
    //     },
    //   ],
    // }),
    visualizer({
      open: false,
    }),
  ],
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
  },
});
