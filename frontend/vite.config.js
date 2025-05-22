import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5002,
    proxy: {

      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true,
      },

      '/socket.io': {
        target: 'ws://127.0.0.1:5001',
        ws: true,
        changeOrigin: true,
        rewriteWsOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          formik: ['formik'],
          reactBootstrap: ['react-bootstrap'],
          reactBootstrapIcons: ['react-bootstrap-icons'],
        },
      },
    },
  },
});
