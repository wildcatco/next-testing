/* eslint-disable @typescript-eslint/no-namespace */
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      write(value: string | RegExp): Chainable<Element>;
      resetDbAndIsrCache(): Chainable<Element>;
      signIn(email: string, password: string): Chainable<Element>;
    }
    interface cy {
      state(value: string | RegExp): Chainable<Element>;
    }
  }
}
