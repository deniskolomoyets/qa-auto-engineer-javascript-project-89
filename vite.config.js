import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    preserveSymlinks: true,
  },
  optimizeDeps: {
    include: ['@hexlet/chatbot-v2', '@hexlet/chatbot-v2/example-steps'],
  },
  test: {
    environment: 'jsdom',
    css: true,
    globals: true,
    setupFiles: ['vitest.setup.js'],
    server: {
      deps: {
        inline: [/@hexlet\/.*/],
      },
    },
    deps: {
      web: {
        transformCss: true,
      },
    },
  },
  plugins: [react()],
});
