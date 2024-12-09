import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { join } from "path";
import { visualizer } from 'rollup-plugin-visualizer'
import cdn from 'vite-plugin-cdn-import'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // cdn({
    //   modules: ['react', 'react-dom', 'dayjs', 'antd'],
    // }),
    visualizer({
      open: true
    })

  ],
  resolve: {
    alias: {
      '@': join(__dirname, "src"),
    }
  },
})
