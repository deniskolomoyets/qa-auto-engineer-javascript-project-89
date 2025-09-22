/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import '@testing-library/jest-dom/vitest';
import React from 'react';

// Mock React runtime for chatbot compatibility
global.React = React;
