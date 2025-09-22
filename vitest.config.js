import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chatbotPkg = undefined;
let chatbotExample = undefined;
try {
  chatbotPkg = require.resolve('@hexlet/chatbot-v2');
  chatbotExample = require.resolve('@hexlet/chatbot-v2/example-steps');
} catch {
  // Intentionally left empty: fallback if modules cannot be resolved
}

export default defineConfig({
  resolve: {
    preserveSymlinks: true,
    alias: {
      ...(chatbotPkg ? { '@hexlet/chatbot-v2': chatbotPkg } : {}),
      ...(chatbotExample
        ? { '@hexlet/chatbot-v2/example-steps': chatbotExample }
        : {}),
    },
  },
  ssr: {
    noExternal: ['@hexlet/chatbot-v2', '@hexlet/chatbot-v2/example-steps'],
  },
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


