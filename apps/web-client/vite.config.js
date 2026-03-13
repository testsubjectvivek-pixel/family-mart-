import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/family-mart-/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@familymart/ui-components': path.resolve(__dirname, '../../packages/ui-components/src'),
      '@familymart/shared-utils': path.resolve(__dirname, '../../packages/shared-utils/src'),
      '@familymart/api-client': path.resolve(__dirname, '../../packages/api-client/src'),
      '@familymart/config': path.resolve(__dirname, '../../packages/config/src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
