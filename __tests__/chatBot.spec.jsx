import { render, waitFor } from '@testing-library/react';
import { describe, test, vi, beforeEach } from 'vitest';
import App from '../src/App.jsx';
import ChatBotPage from './pages/chatBotPage';
import AppPage from './pages/appPage';
import data from '../__fixtures__/regData.js';

describe('App tests', () => {
  let chatBotPage;
  let appPage;
  beforeEach(() => {
    render(<App />);
    chatBotPage = new ChatBotPage();
    appPage = new AppPage();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  test('render app', async () => {
    await appPage.checkAppRender();
  });

  test('shows chatbot in the app', async () => {
    await chatBotPage.checkChatBotRender();
    await chatBotPage.openChat();
    await chatBotPage.checkConversationStartBtnVisible();
  });

  test('registration result in the app', async () => {
    await waitFor(async () => {
      await appPage.registerUser(data);
    });
    await appPage.checkTableIsVisible();
    await appPage.checkTablecontent(data);
    await appPage.checkBackBtnIsVisible();
  });
});