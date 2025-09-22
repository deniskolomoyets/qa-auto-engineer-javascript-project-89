import { screen } from '@testing-library/react';

/**
 * Common test setup and helper functions
 */
export class TestHelpers {
  /**
   * Setup chatbot for testing - opens chat and ensures start button is visible
   * @param {ChatBotPage} chatBotPage - The chatbot page object
   */
  static async setupChatbot(chatBotPage) {
    await chatBotPage.openChat();
    await chatBotPage.checkConversationStartBtnVisible();
  }

  /**
   * Start chatbot conversation by clicking the start button
   * @param {ChatBotPage} chatBotPage - The chatbot page object
   */
  static async startChatbotConversation(chatBotPage) {
    const startBtn = await screen.getByRole('button', { 
      name: chatBotPage.steps[0].buttons[0].text 
    });
    await chatBotPage.user.click(startBtn);
  }

  /**
   * Complete chatbot setup and start conversation
   * @param {ChatBotPage} chatBotPage - The chatbot page object
   */
  static async setupAndStartChatbot(chatBotPage) {
    await this.setupChatbot(chatBotPage);
    await this.startChatbotConversation(chatBotPage);
  }

  /**
   * Verify chatbot modal is closed and open button is visible
   * @param {ChatBotPage} chatBotPage - The chatbot page object
   */
  static async verifyChatbotClosed(chatBotPage) {
    await chatBotPage.checkChatBotRender();
  }
}
