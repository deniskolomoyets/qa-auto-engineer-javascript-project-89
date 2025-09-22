import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    css: true,
    globals: true,
    setupFiles: ['vitest.setup.js'],
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
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
});
