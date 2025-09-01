import { waitFor, within } from '@testing-library/react';
import { renderWidget } from './test-utils/chatbot-helpers';
import { ChatbotModal } from './page-objects/ChatbotModal';
import { vi } from 'vitest';

import {
  stepsNoWelcome,
  stepsEmptyWelcome,
  stepsBrokenNext,
  stepsLongMessage,
  stepsNoButtons,
} from '../__fixtures__/edgeSteps.js';

test('не падает, если нет welcome шага', async () => {
  const { user } = renderWidget(stepsNoWelcome);
  const modal = await new ChatbotModal(user).open();
  expect(modal.getDialog()).toBeInTheDocument();
});

test('не падает с пустым сообщением welcome', async () => {
  const { user } = renderWidget(stepsEmptyWelcome);
  const modal = await new ChatbotModal(user).open();
  expect(modal.getDialog()).toBeInTheDocument();
});

test('кнопка с невалидным next не ломает виджет', async () => {
  const { user } = renderWidget(stepsBrokenNext);
  const po = await new ChatbotModal(user).open();

  await po.clickButtonByName(/дальше/i);
  // UI жив
  expect(po.getDialog()).toBeInTheDocument();
});

test('очень длинное сообщение рендерится и скролл вызывается', async () => {
  const scrollSpy = vi.spyOn(window.HTMLElement.prototype, 'scrollIntoView');
  const { user } = renderWidget(stepsLongMessage);
  await new ChatbotModal(user).open();

  expect(scrollSpy).toHaveBeenCalled();
});

test('welcome без кнопок — UI стабилен', async () => {
  const { user } = renderWidget(stepsNoButtons);
  const po = await new ChatbotModal(user).open();

  // есть хотя бы одно сообщение (bubble)
  expect(po.getMessageBubbles().length).toBeGreaterThan(0);
  // и нет action-кнопок
  expect(po.countActionButtons()).toBe(0);
});

test('закрытие через ESC', async () => {
  const { user } = renderWidget(stepsNoButtons);
  const po = await new ChatbotModal(user).open();

  await po.pressEsc();

  // Ждём, пока диалог исчезнет
  await waitFor(() => {
    const root = within(document.body);
    expect(
      root.queryByRole('dialog', { name: /виртуальный помощник/i })
    ).not.toBeInTheDocument();
  });
});


test('закрытие кликом по backdrop — в jsdom модалка остаётся открытой', async () => {
  const { user } = renderWidget(stepsNoButtons);
  const po = await new ChatbotModal(user).open();

  await po.clickBackdropIfPresent();

  expect(po.getDialog()).toBeInTheDocument();
});

test('многократные клики по "Открыть Чат" не создают несколько модалок', async () => {
  const { user } = renderWidget(stepsNoButtons);
  const po = new ChatbotModal(user);

  await po.open();
  await po.open();
  await po.open();

  const dialogs = within(document.body).getAllByRole(
    'dialog',
    { name: /виртуальный помощник/i }
    );
    expect(dialogs).toHaveLength(1);
});
