/// <reference types= "cypress"/>

beforeEach("navigating to the section", () => {
  cy.visit("/");
  cy.contains("Forms").click();
  cy.contains("Form Layouts").click();
});
it("Locator Syntax", () => {
  //by tag
  cy.get("input");

  //by ID
  cy.get("#inputEmail1");

  //by Class Value
  cy.get(".input-full-width");

  //by attribute
  cy.get("[fullwidth]");

  // by attribute with value
  cy.get('[placeholder="Email"]');

  // by entire class value
  cy.get(
    '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]',
  );

  // how to combine several attributes (no spaces between them)
  cy.get('[placeholder="Email"][fullwidth]');
  cy.get('input[placeholder="Email"]');

  // by data-cy attribute
  cy.get('[data-cy="inputEmail1"]');
});
