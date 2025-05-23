import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-toastify'],
    exclude: [],
  },
  build: {
    rollupOptions: {
      external: [
        // Другие зависимости не требуются
      ],
    },
  },
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
        changeOrigin: true,
      },
    },
  },
});
