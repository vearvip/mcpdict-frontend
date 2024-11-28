import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { join } from "path";

export default defineConfig({
  plugins: [solid()],
  resolve: {
    alias: {
      '@': join(__dirname, "src"),
    }
  }
})
