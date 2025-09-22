import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { expect } from 'vitest';
import steps from '@hexlet/chatbot-v2/example-steps';
import '@testing-library/jest-dom';
import getBtn from './utils/getBtn';

class ChatBotPage {
  constructor() {
    this.user = userEvent.setup();
    this.steps = steps;
    this.getBtn = getBtn;
    this.scroll = window.HTMLElement.prototype.scrollIntoView;
    this.buttons = {
      openChatBtn: { name: 'Открыть Чат' },
      closeBtn: { name: 'Close' },
      conversationStartBtn: { name: this.steps[0].buttons[0].text },
      changeProfessionBtn: { name: this.steps[1].buttons[0].text },
      tryInITBtn: { name: this.steps[1].buttons[1].text },
      advancedInITBtn: { name: this.steps[1].buttons[2].text },
      tellMoreBtn: { name: this.steps[3].buttons[0].text },
      simplerBtn: { name: this.steps[3].buttons[1].text },
      backBtn: { name: this.steps[3].buttons[2].text },
      tryAgainBtn: { name: this.steps[5].buttons[1].text },
      signToCourseBtn: { name: this.steps[4].buttons[0].text },
    };
  }

  async clickNextStep(step) {
    await waitFor(async () => {
      await this.user.click(screen.getByText(step));
    });
  }

  async openChat() {
    await waitFor(async () => {
      const button = await this.getBtn(this.buttons.openChatBtn);
      await this.user.click(button);
    });
  }

  async closeChat() {
    await waitFor(async () => {
      const button = await this.getBtn(this.buttons.closeBtn);
      await this.user.click(button);
    });
  }

  async checkChatBotRender() {
    const button = await this.getBtn(this.buttons.openChatBtn);
    expect(button).toBeVisible();
  }

  async checkConversationStartBtnVisible() {
    const button = await screen.getByRole('button', { name: this.steps[0].buttons[0].text });
    expect(button).toBeVisible();
  }

  async checkStartBlockRendered() {
    expect(
      await this.getBtn(this.buttons.changeProfessionBtn),
    ).toBeVisible();
    expect(await this.getBtn(this.buttons.tryInITBtn)).toBeVisible();
    expect(
      await this.getBtn(this.buttons.advancedInITBtn),
    ).toBeVisible();
    expect(screen.getByText(this.steps[1].messages[0])).toBeVisible();
  }

  async checkSwitchBlockRendered() {
    expect(await this.getBtn(this.buttons.tellMoreBtn)).toBeVisible();
    expect(await this.getBtn(this.buttons.simplerBtn)).toBeVisible();
    expect(await this.getBtn(this.buttons.backBtn)).toBeVisible();
    expect(screen.getByText(this.steps[3].messages[0])).toBeVisible();
  }

  async checkDetailsBlockRendered() {
    expect(
      await this.getBtn(this.buttons.signToCourseBtn),
    ).toBeVisible();
    expect(await this.getBtn(this.buttons.backBtn)).toBeVisible();
    expect(screen.getByText(this.steps[4].messages[0])).toBeVisible();
  }

  async checkSubscribeBlockRendered() {
    expect(
      await this.getBtn(this.buttons.signToCourseBtn),
    ).toBeVisible();
    expect(await this.getBtn(this.buttons.tryAgainBtn)).toBeVisible();
    expect(screen.getByText(this.steps[6].messages[0])).toBeVisible();
  }

  async checkEmptyStepsBlockRendered() {
    const message = screen.queryByText(this.steps[0].messages[0]);
    const button = screen.queryByRole('button', {
      name: this.steps[0].buttons[0].text,
    });
    expect(message).not.toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  }

  async checkEmptyMessagesBlockRendered() {
    const message = screen.queryByText(this.steps[0].messages[0]);
    const button = screen.queryByRole('button', {
      name: this.steps[0].buttons[0].text,
    });
    expect(message).not.toBeInTheDocument();
    expect(button).toBeVisible();
  }

  async checkEmptyButtonsBlockRendered() {
    const message = screen.queryByText(this.steps[0].messages[0]);
    const button = screen.queryByRole('button', {
      name: this.steps[0].buttons[0].text,
    });
    expect(message).toBeVisible();
    expect(button).not.toBeInTheDocument();
  }

  async verifyScrollIntoView() {
    await waitFor(() => {
      expect(this.scroll).toHaveBeenCalled();
    });
  }
}

export default ChatBotPage;
