/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import '@testing-library/jest-dom';
import React from 'react';

// Mock React internals that @hexlet/chatbot-v2 expects
if (!global.React) {
  global.React = React;
}

// Mock React internals for chatbot compatibility
if (!global.React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
  global.React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
    ReactCurrentDispatcher: {
      current: null
    },
    ReactCurrentOwner: {
      current: null,
      recentlyCreatedOwnerStacks: 0
    }
  };
}
