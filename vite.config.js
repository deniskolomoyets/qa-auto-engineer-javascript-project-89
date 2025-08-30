import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './vite.setup.js',
    css: true,
    globals: true,
    server: {
      deps: { inline: ['@hexlet/chatbot-v2'] }, // ← for CSS in the package
    },
  }
});

