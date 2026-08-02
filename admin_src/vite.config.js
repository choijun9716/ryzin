import { defineConfig } from 'vite';

export default defineConfig({
  base: '/admin/',
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: '../admin',
    emptyOutDir: true,
  },
  // SPA fallback - 모든 경로를 index.html로 라우팅
  appType: 'spa',
});
