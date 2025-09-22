/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { defineConfig } from 'vite';
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.js'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
    },
    pool: 'vmForks',
  },
});
