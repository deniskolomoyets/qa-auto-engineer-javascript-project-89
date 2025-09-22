import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  test: {
    environment: 'jsdom',
    css: true,
    globals: true,
    include: ['__tests__/**/*.spec.{js,jsx,ts,tsx}'],
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


