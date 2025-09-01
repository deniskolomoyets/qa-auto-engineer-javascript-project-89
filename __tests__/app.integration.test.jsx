import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect } from 'vitest';
import App from '../src/App.jsx';

test('form submits and shows result correctly', async () => {
  render(<App />);
  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.type(screen.getByLabelText(/пароль/i), 'secret');
  await user.type(screen.getByLabelText(/город/i), 'Тель-Авив');
  await user.selectOptions(screen.getByLabelText(/страна/i), 'Россия');
  await user.click(screen.getByLabelText(/принять правила/i));

  await user.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

  // Проверяем таблицу результата
  expect(await screen.findByText('test@example.com')).toBeInTheDocument();
  expect(screen.getByText('Тель-Авив')).toBeInTheDocument();
  expect(screen.getByText('Россия')).toBeInTheDocument();
});

test('chat widget opens inside the app', async () => {
  render(<App />);
  const user = userEvent.setup();

  const openChatBtn = screen.getByRole('button', { name: /открыть чат/i });
  await user.click(openChatBtn);

  expect(await screen.findByRole('dialog', { name: /виртуальный помощник/i }))
    .toBeInTheDocument();
});
