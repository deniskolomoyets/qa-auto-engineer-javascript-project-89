import { render, waitFor, screen } from '@testing-library/react';
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
    // Debug output for component markup
    screen.debug();
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

  test('chatbot modal open/close interaction', async () => {
    // Test opening chat modal
    await chatBotPage.checkChatBotRender();
    await chatBotPage.openChat();
    await chatBotPage.checkConversationStartBtnVisible();
    
    // Test closing chat modal
    await chatBotPage.closeChat();
    await chatBotPage.checkChatBotRender();
  });

  test('chatbot step transitions', async () => {
    await chatBotPage.openChat();
    
    // Start conversation
    await chatBotPage.checkConversationStartBtnVisible();
    const startBtn = await screen.getByRole('button', { name: chatBotPage.steps[0].buttons[0].text });
    await chatBotPage.user.click(startBtn);
    
    // Check first step is rendered
    await chatBotPage.checkStartBlockRendered();
    
    // Click on profession change button
    const changeProfessionBtn = await chatBotPage.getBtn(chatBotPage.buttons.changeProfessionBtn);
    await chatBotPage.user.click(changeProfessionBtn);
    
    // Check second step is rendered
    await chatBotPage.checkSwitchBlockRendered();
  });

  test('chatbot scroll behavior', async () => {
    await chatBotPage.openChat();
    await chatBotPage.checkConversationStartBtnVisible();
    
    // Start conversation to trigger scroll
    const startBtn = await screen.getByRole('button', { name: chatBotPage.steps[0].buttons[0].text });
    await chatBotPage.user.click(startBtn);
    
    // Verify scroll was called
    await chatBotPage.verifyScrollIntoView();
  });
});
