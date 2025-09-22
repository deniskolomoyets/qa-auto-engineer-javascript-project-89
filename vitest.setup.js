/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import '@testing-library/jest-dom/vitest';
import React from 'react';

// Mock React runtime for chatbot compatibility
global.React = React;

// Mock React runtime internals that chatbot expects
if (!global.React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
  global.React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
    ReactCurrentDispatcher: {
      current: null
    },
    ReactCurrentOwner: {
      current: null
    }
  };
}
