import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Widget from '@hexlet/chatbot-v2';
import '@hexlet/chatbot-v2/styles';

export function renderWidget(steps) {
  render(Widget(steps));
  const user = userEvent.setup();
  return { user };
}

export async function openChat(user) {
  await user.click(screen.getByRole('button', { name: /открыть чат/i }));
  const dialog = await screen.findByRole('dialog', { name: /виртуальный помощник/i });
  return dialog;
}

export function getDialog() {
  return screen.getByRole('dialog', { name: /виртуальный помощник/i });
}

export function getChatContainer(dialog) {
  // адаптируй селектор под твой DOM (id/class)
  return dialog.querySelector('.modal-body'); 
}

export function getBackdrop() {
  return document.querySelector('.modal-backdrop');
}

export async function closeWithEsc(user) {
  await user.keyboard('{Escape}');
}

export function countActionButtons(dialog) {
  // в зоне чата не должно быть action-кнопок, если buttons: []
  const chat = getChatContainer(dialog);
  return within(chat).queryAllByRole('button').length;
}