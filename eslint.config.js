// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import stylistic from '@stylistic/eslint-plugin'; 
export default [
  // 1. Игнорируем папку сборки
  { ignores: ['dist'] },

  // 2. Базовая конфигурация для JS/JSX
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser, // Добавляем браузерные globals
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: '18.3' }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      stylistic,
    },
    rules: {
      // Базовые правила
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // Основные правила стиля, которые требуют в Hexlet:
      'stylistic/semi': ['error', 'always'],          // Было 'semi'
      'stylistic/quotes': ['error', 'single'],        // Было 'quotes'
      'stylistic/indent': ['error', 2],               // Было 'indent'
      'stylistic/eol-last': ['error', 'always'],      // Было 'eol-last'
      
      // Глобальные переменные тестов (для __tests__):
      'no-undef': 'off', 
      'react/prop-types': 'off',      
    },
  },
];
