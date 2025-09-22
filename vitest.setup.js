import '@testing-library/jest-dom/vitest';
import { createElement } from 'react';

// Mock React runtime for chatbot
global.React = { createElement };
