// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

// polyfill necessary for jsdom test environment
// reference: https://stackoverflow.com/a/68468204
import { TextDecoder, TextEncoder } from "util";

import { resetDB } from "@/__tests__/__mocks__/db/utils/reset-db";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// reset db
beforeEach(async () => {
  await resetDB();
});

afterEach(async () => {
  await resetDB();
});
