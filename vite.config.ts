import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import suidPlugin from "@suid/vite-plugin";
import { join } from "path";

export default defineConfig({
  plugins: [suidPlugin(),solid()],
  resolve: {
    alias: {
      '@': join(__dirname, "src"),
    }
  },  
  build: {
    target: "esnext",
  },
})
