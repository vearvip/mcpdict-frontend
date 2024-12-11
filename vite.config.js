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
    // cdn({
    //   prodUrl: 'https://cdn.bootcdn.net/ajax/libs/{name}/{version}/{path}',
    //   enableInDevMode: true,
    //   modules: [
    //     'react', 
    //     'react-dom', 
    //     'dayjs', 
    //     'antd',
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
