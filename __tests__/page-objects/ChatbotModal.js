import { screen, within } from '@testing-library/react';
import { getBackdrop, getChatContainer } from '../test-utils/chatbot-helpers';

export class ChatbotModal {
  constructor(user) {
    this.user = user;
  }

  async open() {
    await this.user.click(screen.getByRole('button', { name: /открыть чат/i }));
    this.dialog = await screen.findByRole('dialog', { name: /виртуальный помощник/i });
    return this;
  }

  getDialog() {
    return this.dialog ?? screen.getByRole('dialog', { name: /виртуальный помощник/i });
  }

  getChat() {
    return getChatContainer(this.getDialog());
  }

  getMessageBubbles() {
    // подстрой под реальный селектор «пузырей» сообщений
    return this.getChat().querySelectorAll('.message'); 
  }

  getBackdrop() {
    return getBackdrop();
  }

  async pressEsc() {
    await this.user.keyboard('{Escape}');
  }

  async clickBackdropIfPresent() {
    const backdrop = this.getBackdrop();
    if (backdrop) await this.user.click(backdrop);
  }

  countActionButtons() {
    return within(this.getChat()).queryAllByRole('button').length;
  }

  async clickButtonByName(name) {
    const btn = within(this.getDialog()).getByRole('button', { name });
    await this.user.click(btn);
  }
}