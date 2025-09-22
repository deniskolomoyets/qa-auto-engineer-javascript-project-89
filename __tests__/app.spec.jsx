import { render, waitFor, screen } from '@testing-library/react';
import { describe, test, vi, beforeEach } from 'vitest';
import App from '../src/App.jsx';
import ChatBotPage from './pages/chatBotPage';
import AppPage from './pages/appPage';
import { TestHelpers } from './utils/testHelpers';
import data from '../__fixtures__/regData.js';

describe('App Integration Tests', () => {
  let chatBotPage;
  let appPage;
  
  beforeEach(() => {
    render(<App />);
    chatBotPage = new ChatBotPage();
    appPage = new AppPage();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  describe('Application Rendering', () => {
    test('should render app with debug output', async () => {
      screen.debug();
      await appPage.checkAppRender();
    });
  });

  describe('Chatbot Integration', () => {
    test('should display chatbot widget', async () => {
      await chatBotPage.checkChatBotRender();
      await TestHelpers.setupChatbot(chatBotPage);
    });

    test('should handle modal open/close interaction', async () => {
      await chatBotPage.testModalOpenClose();
    });

    test('should navigate between conversation steps', async () => {
      await chatBotPage.testConversationFlow();
    });

    test('should scroll to new messages', async () => {
      await TestHelpers.setupAndStartChatbot(chatBotPage);
      await chatBotPage.verifyScrollIntoView();
    });
  });

  describe('Registration Form Integration', () => {
    test('should handle user registration flow', async () => {
      await waitFor(async () => {
        await appPage.registerUser(data);
      });
      await appPage.checkTableIsVisible();
      await appPage.checkTablecontent(data);
      await appPage.checkBackBtnIsVisible();
    });
  });
});
