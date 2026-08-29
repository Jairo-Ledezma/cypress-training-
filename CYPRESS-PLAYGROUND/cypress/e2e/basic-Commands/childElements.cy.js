/// <reference types="cypress"/>

beforeEach("page navigation", () => {
  cy.visit("/");
  cy.contains("Forms").click();
  cy.contains("Form layouts", { matchCase: false }).click();
});

it("child elements", () => {
  cy.contains("nb-card", "Using the Grid").find(".row").find("button");

  cy.get("nb-card").find("nb-radio-group").contains("Option 1");
  cy.get("nb-card nb-radio-group").contains("Option 1");
  cy.get('nb-card > nb-card-body [placeholder="Jane Doe"]');
});
