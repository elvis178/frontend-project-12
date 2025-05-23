import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Критически важно для корректных путей
  server: {
    port: 5002,
    proxy: {
      // Проксируем запросы к API
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true
      },
      // Проксируем WebSocket соединения
      '/socket.io': {
        target: 'ws://127.0.0.1:5001',
        ws: true,
        rewriteWsOrigin: true,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    sourcemap: true, // Для отладки
    rollupOptions: {
      input: './index.html'
    }
  },
  preview: {
    port: process.env.PORT || 10000, // Важно для Render
    host: true,
    strictPort: true,
    historyApiFallback: true // Для SPA
  }
});
