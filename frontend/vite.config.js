import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // Настройки для исправления react-toastify
  optimizeDeps: {
    include: [
      'react-toastify',
      'react-toastify/dist/ReactToastify.css'
    ],
    exclude: ['js-big-decimal'] // Если не используется
  },

  // Ваши текущие настройки сервера
  server: {
    port: 5002,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true
      },
      '/socket.io': {
        target: 'ws://localhost:5001',
        ws: true,
        rewriteWsOrigin: true,
        changeOrigin: true,
      },
    },
    host: true // Для доступа с других устройств в сети
  },

  // Настройки сборки
  build: {
    outDir: './dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: [
        // Добавьте сюда другие проблемыные зависимости, если будут
      ],
      output: {
        manualChunks: {
          // Оптимизация разделения кода
          react: ['react', 'react-dom', 'react-router-dom'],
          toastify: ['react-toastify']
        }
      }
    }
  },

  // Для корректной работы с SPA и роутингом
  base: '/',
  appType: 'spa'
});
