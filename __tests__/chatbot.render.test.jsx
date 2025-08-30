// __tests__/chatbot.render.test.jsx
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Widget from '@hexlet/chatbot-v2';
import steps from '../__fixtures__/basicSteps.js';

test('chatbot renders Open Chat button', () => {
  const { container } = render(Widget(steps));
  expect(screen.getByRole('button', { name: /открыть чат/i })).toBeInTheDocument();
  expect(container).not.toBeEmptyDOMElement();
});

test('chatbot shows welcome after opening', async () => {
  render(Widget(steps));
  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: /открыть чат/i }));
  expect(await screen.findByText(/привет! я тестовый бот\./i)).toBeInTheDocument();
});
