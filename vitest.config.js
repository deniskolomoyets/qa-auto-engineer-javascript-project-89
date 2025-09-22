import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  test: {
    environment: 'jsdom',
    css: true,
    globals: true,
    include: ['__tests__/**/*.spec.{js,jsx,ts,tsx}'],
    setupFiles: ['vitest.setup.js'],
    deps: {
      inline: [/@hexlet\/.*/],
      optimizer: {
        web: {
          include: ['@hexlet/chatbot-v2'],
        },
      },
      web: {
        transformCss: true,
      },
    },
  },
  plugins: [react()],
});


