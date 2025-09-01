import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, vi } from 'vitest';
import Widget from '@hexlet/chatbot-v2';
import '@hexlet/chatbot-v2/styles';


import {
  stepsNoWelcome,
  stepsEmptyWelcome,
  stepsBrokenNext,
  stepsLongMessage,
  stepsNoButtons,
} from '../__fixtures__/edgeSteps.js';

// Вспомогалка: открыть модалку чата и дождаться её появления
async function openChat(user) {
  await user.click(screen.getByRole('button', { name: /открыть чат/i }));
  expect(
    await screen.findByRole('dialog', { name: /виртуальный помощник/i })
  ).toBeInTheDocument();
}

/**
 * 1) Нет welcome шага — виджет не должен падать
 */
test('не падает, если нет welcome шага', async () => {
  render(Widget(stepsNoWelcome));
  const user = userEvent.setup();

  await openChat(user);

  // UI живой, модалка открыта
  expect(
    screen.getByRole('dialog', { name: /виртуальный помощник/i })
  ).toBeInTheDocument();
});

/**
 * 2) Пустой welcome.message — виджет устойчив (buttons: [] в фикстуре)
 */
test('не падает с пустым сообщением welcome', async () => {
  render(Widget(stepsEmptyWelcome));
  const user = userEvent.setup();

  await openChat(user);

  // Никаких падений, модалка открыта
  expect(
    screen.getByRole('dialog', { name: /виртуальный помощник/i })
  ).toBeInTheDocument();
});

/**
 * 3) Кнопка ведёт на несуществующий next — интерфейс не ломается
 */
test('кнопка с невалидным next не ломает виджет', async () => {
  render(Widget(stepsBrokenNext));
  const user = userEvent.setup();

  await openChat(user);

  // Кнопка "Дальше" существует, клик по ней не должен ломать UI
  const nextBtn = screen.getByRole('button', { name: /дальше/i });
  await user.click(nextBtn);

  // Ожидание: UI жив, модалка на месте (без проверки конкретного текста)
  expect(
    screen.getByRole('dialog', { name: /виртуальный помощник/i })
  ).toBeInTheDocument();
});

/**
 * 4) Очень длинное сообщение — рендерится и происходит скролл к низу
 */
test('очень длинное сообщение рендерится и скролл вызывается', async () => {
  const scrollSpy = vi.spyOn(window.HTMLElement.prototype, 'scrollIntoView');

  render(Widget(stepsLongMessage));
  const user = userEvent.setup();

  await openChat(user);

  // Как минимум один вызов скролла ожидаем
  expect(scrollSpy).toHaveBeenCalled();
});

/**
 * 5) Welcome без кнопок — UI стабилен
 */
test('welcome без кнопок — UI стабилен', async () => {
  render(Widget(stepsNoButtons));
  const user = userEvent.setup();

  await openChat(user);

  const dialog = await screen.findByRole('dialog', { name: /виртуальный помощник/i });

  // Есть хотя бы один bubble сообщения — видим аватар ассистента
  expect(within(dialog).getByAltText(/tota/i)).toBeInTheDocument();

  // В области чата (modal-body) нет action-кнопок
  const chatBody = dialog.querySelector('.modal-body');
  expect(chatBody).toBeTruthy();

  const actionButtonsInsideChat = within(chatBody).queryAllByRole('button');
  expect(actionButtonsInsideChat).toHaveLength(0);

  // И модалка не развалилась
  expect(dialog).toBeInTheDocument();
});


/**
 * 6) Закрытие через ESC — в библиотеке ожидаем закрытие модалки
 * (если поведение изменится, можно ослабить ожидание до "UI не падает")
 */
test('закрытие через ESC', async () => {
  render(Widget(stepsNoButtons));
  const user = userEvent.setup();

  await openChat(user);

  await user.keyboard('{Escape}');

  // Ждём, что модалка исчезнет
  await waitFor(() => {
    expect(
      screen.queryByRole('dialog', { name: /виртуальный помощник/i })
    ).not.toBeInTheDocument();
  });
});

/**
 * 7) Клик по backdrop — в jsdom поведение Bootstrap обычно НЕ срабатывает.
 * Фиксируем фактическое: модалка остаётся открытой.
 */
test('закрытие кликом по backdrop — в jsdom модалка остаётся открытой', async () => {
  render(Widget(stepsNoButtons));
  const user = userEvent.setup();

  await openChat(user);

  // Пытаемся кликнуть по backdrop, если он отрендерился
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) {
    await user.click(backdrop);
  }

  // Модалка всё ещё на месте (фактическое поведение в тестовой среде)
  expect(
    screen.getByRole('dialog', { name: /виртуальный помощник/i })
  ).toBeInTheDocument();
});

/**
 * 8) Многократные клики по "Открыть Чат" не создают несколько модалок
 */
test('многократные клики по "Открыть Чат" не создают несколько модалок', async () => {
  render(Widget(stepsNoButtons));
  const user = userEvent.setup();

  // Кликаем несколько раз по кнопке открытия
  const openBtn = screen.getByRole('button', { name: /открыть чат/i });
  await user.click(openBtn);
  await user.click(openBtn);
  await user.click(openBtn);

  // Должна быть ровно одна модалка
  const dialogs = screen.getAllByRole('dialog', { name: /виртуальный помощник/i });
  expect(dialogs).toHaveLength(1);
});