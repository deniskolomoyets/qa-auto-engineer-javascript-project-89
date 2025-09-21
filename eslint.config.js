// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

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
    },
    rules: {
      // Базовые правила
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // Основные правила стиля, которые требуют в Hexlet:
      'semi': ['error', 'always'],          // Требуем точку с запятой
      'quotes': ['error', 'single'],        // Требуем одинарные кавычки
      'indent': ['error', 2],               // Отступы в 2 пробела
      'eol-last': ['error', 'always'],      // Пустая строка в конце файла
      'react/prop-types': 'off',            // Отключаем проверку PropTypes
      
      // Глобальные переменные тестов (для __tests__):
      'no-undef': 'off', 
    },
  },
];
