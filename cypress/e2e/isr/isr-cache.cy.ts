it("'shows' page's data is coming from ISR cache", () => {
  // https://glebbahmutov.com/blog/ssr-e2e/#removing-application-bundle
  cy.request("/shows")
    .its("body")
    .then((html) => {
      // remove the scripts, so they don't start automatically
      const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, "");
      cy.state("document").write(staticHtml);
    });

  cy.findAllByText(/2022 apr 1[567]/i).should("have.length", 3);
});

it("'bands' page's data is coming from ISR cache", () => {
  cy.request("/bands")
    .its("body")
    .then((html) => {
      const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, "");
      cy.state("document").write(staticHtml);
    });

  cy.findByRole("heading", { name: /the joyous nun riot/i }).should("exist");
  cy.findByRole("heading", { name: /shamrock pete/i }).should("exist");
  cy.findByRole("heading", { name: /the wandering bunnies/i }).should("exist");
});

export {};
