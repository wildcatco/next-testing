it("displays show page after clicking 'purchase more tickets' button", () => {
  cy.task("db:reset").signIn(
    Cypress.env("USER_EMAIL"),
    Cypress.env("PASSWORD")
  );

  cy.visit("/user");

  cy.findByRole("button", { name: /purchase more tickets/i }).click();

  cy.findByRole("heading", { name: /upcoming shows/i }).should("exist");
});
