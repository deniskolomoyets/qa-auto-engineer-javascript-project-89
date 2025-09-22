import { defineConfig } from 'vite';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chatbotPkg = undefined;
let chatbotExample = undefined;
try {
  chatbotPkg = require.resolve('@hexlet/chatbot-v2');
  chatbotExample = require.resolve('@hexlet/chatbot-v2/example-steps');
} catch {
  // Intentionally left empty: fallback if @hexlet/chatbot-v2 is not found
}
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
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
