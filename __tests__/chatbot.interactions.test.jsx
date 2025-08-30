import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, vi } from 'vitest';
import Widget from '@hexlet/chatbot-v2';
import steps from '../__fixtures__/basicSteps.js';

test('chat opens and closes correctly', async () => {
  render(Widget(steps));
  const user = userEvent.setup();

  // Открыть чат
  await user.click(screen.getByRole('button', { name: /открыть чат/i }));
  expect(await screen.findByRole('dialog', { name: /виртуальный помощник/i })).toBeInTheDocument();
  expect(await screen.findByText(/привет! я тестовый бот\./i)).toBeInTheDocument();

  // Закрыть чат (кнопка-иконка с aria-label="Close")
  const closeBtn = screen.getByRole('button', { name: /close/i });
  await user.click(closeBtn);

  // ждём исчезновения модалки
  await waitFor(() => {
    expect(screen.queryByRole('dialog', { name: /виртуальный помощник/i })).not.toBeInTheDocument();
  });
});

test('chatbot goes to next step after clicking "Начать"', async () => {
  render(Widget(steps));
  const user = userEvent.setup();

  await user.click(screen.getByRole('button', { name: /открыть чат/i }));
  await user.click(screen.getByRole('button', { name: /начать/i }));

  expect(await screen.findByText(/готово!/i)).toBeInTheDocument();
});

test('scrolls to new message on step change', async () => {
  const scrollSpy = vi.spyOn(window.HTMLElement.prototype, 'scrollIntoView');

  render(Widget(steps));
  const user = userEvent.setup();

  await user.click(screen.getByRole('button', { name: /открыть чат/i }));
  await user.click(screen.getByRole('button', { name: /начать/i }));

  expect(scrollSpy).toHaveBeenCalled();
});
