import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { join } from "path";

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': join(__dirname, "src"),
    }
  }
});
