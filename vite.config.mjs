import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects/index.html'),
        papers: resolve(__dirname, 'papers/index.html'),
        visitor: resolve(__dirname, 'visitor/index.html'),
      },
    },
  },
  server: {
    port: 3000,
  },
});
