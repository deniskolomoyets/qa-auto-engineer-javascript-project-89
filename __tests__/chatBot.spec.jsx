import { beforeEach, describe, test, vi, expect } from 'vitest';
import ChatBotPage from './pages/chatBotPage';
import Widget from '@hexlet/chatbot-v2';
import { validSteps } from '../src/steps.js';
import { emptyMessages } from '../src/emptyMessages.js';
import { emptyButtons } from '../src/emptyButtons.js';
import { render, waitFor } from '@testing-library/react';

describe('Chat Bot tests', () => {
  let chatBotPage;
  describe('positive tests', () => {
    beforeEach(() => {
      render(Widget(validSteps));
      chatBotPage = new ChatBotPage();
      window.HTMLElement.prototype.scrollIntoView = vi.fn();
    });

    const positiveTestCases = [
      {
        description: 'chatbot render',
        steps: [],
        assertions: async () => {
          await chatBotPage.checkChatBotRender();
        },
      },
      {
        description: 'opens the chat modal',
        steps: [],
        assertions: async () => {
          await chatBotPage.checkConversationStartBtnVisible();
        },
      },
      {
        description: 'closes the chat modal',
        steps: [],
        assertions: async () => {
          await chatBotPage.closeChat();
          await chatBotPage.checkChatBotRender();
        },
      },
      {
        description: 'shows the start block in the chat',
        steps: [validSteps[0].buttons[0].text],
        assertions: async () => {
          await chatBotPage.checkStartBlockRendered();
          await chatBotPage.verifyScrollIntoView();
        },
      },
      {
        description: 'shows the switch block in the chat',
        steps: [
          validSteps[0].buttons[0].text,
          validSteps[1].buttons[0].text,
        ],
        assertions: async () => {
          await chatBotPage.checkSwitchBlockRendered();
          await chatBotPage.verifyScrollIntoView();
        },
      },
      {
        description: 'shows the details block in the chat',
        steps: [
          validSteps[0].buttons[0].text,
          validSteps[1].buttons[0].text,
          validSteps[2].buttons[0].text,
        ],
        assertions: async () => {
          await chatBotPage.checkDetailsBlockRendered();
          await chatBotPage.verifyScrollIntoView();
        },
      },
      {
        description: 'shows the subscribe block in the chat',
        steps: [
          validSteps[0].buttons[0].text,
          validSteps[1].buttons[0].text,
          validSteps[2].buttons[0].text,
          validSteps[6].buttons[0].text,
        ],
        assertions: async () => {
          await chatBotPage.checkSubscribeBlockRendered();
          await chatBotPage.verifyScrollIntoView();
        },
      },
    ];

    test.each(positiveTestCases)(
      '$description',
      async ({ description, steps, assertions }) => {
        if (description !== 'chatbot render') {
          await chatBotPage.openChat();
        }
        for (const step of steps) {
          await chatBotPage.clickNextStep(step);
        }
        await assertions();
      },
    );
  });

  describe('negative tests', () => {
    beforeEach(() => {
      chatBotPage = new ChatBotPage();
      window.HTMLElement.prototype.scrollIntoView = vi.fn();
    });

    test('shows error with invalid steps', async () => {
      await waitFor(() => {
        expect(() => render(Widget({})).toThrow());
      });
    });

    test('shows error with empty steps', async () => {
      render(Widget([]));
      await chatBotPage.openChat();
      await chatBotPage.checkEmptyStepsBlockRendered();
    });

    test('shows error with empty messages', async () => {
      render(Widget(emptyMessages));
      await chatBotPage.openChat();
      await chatBotPage.checkEmptyMessagesBlockRendered();
    });

    test('shows error with empty buttons', async () => {
      render(Widget(emptyButtons));
      await chatBotPage.openChat();
      await chatBotPage.checkEmptyButtonsBlockRendered();
    });
  });
});
