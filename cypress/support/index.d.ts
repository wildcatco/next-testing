declare namespace Cypress {
  interface Chainable {
    write(value: string | RegExp): Chainable<Element>;
  }
  interface cy {
    state(value: string | RegExp): Chainable<Element>;
  }
}
