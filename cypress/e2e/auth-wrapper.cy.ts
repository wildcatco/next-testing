it("runs auth flow for successful login to protected reservations page", () => {
  // visit reservations page for the first show (id = 0)
  cy.task("db:reset").visit("/reservations/0");

  // check for sign in form
  cy.findByRole("heading", { name: /sign in to your account/i }).should(
    "exist"
  );

  // check that there's no option to purchase tickets
  cy.findByRole("button", { name: /purchase/i }).should("not.exist");

  // enter valid sign-in credentials
  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env("USER_EMAIL"));
  cy.findByLabelText(/password/i)
    .clear()
    .type(Cypress.env("PASSWORD"));

  // submit the form
  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  // check for purchase button and band name
  cy.findByRole("button", { name: /purchase/i }).should("exist");
  cy.findByRole("heading", { name: /the wandering bunnies/i }).should("exist");

  // check for email and sign-out button on navbar
  cy.findByRole("button", { name: Cypress.env("USER_EMAIL") }).should("exist");
  cy.findByRole("button", { name: /sign out/i }).should("exist");

  // check that sign in button does not exists
  cy.findByRole("button", { name: /sign in/i }).should("not.exist");
});

it("login fails", () => {
  cy.task("db:reset").visit("/user");

  cy.findByRole("heading", { name: /welcome/i }).should("not.exist");

  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env("USER_EMAIL"));
  cy.findByLabelText(/password/i)
    .clear()
    .type("wrongPassword");
  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  cy.findByText(/sign in failed/i);

  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env("USER_EMAIL"));
  cy.findByLabelText(/password/i)
    .clear()
    .type(Cypress.env("PASSWORD"));
  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  cy.findByRole("heading", { name: /welcome/i }).should("exist");
  cy.findByRole("heading", { name: /your tickets/i }).should("exist");

  cy.findByRole("button", { name: Cypress.env("USER_EMAIL") }).should("exist");
  cy.findByRole("button", { name: /sign out/i }).should("exist");
  cy.findByRole("button", { name: /sign in/i }).should("not.exist");
});
