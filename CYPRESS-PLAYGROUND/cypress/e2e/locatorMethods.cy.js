///<reference types= "cypress" />
beforeEach("navigation", () => {
  cy.visit("/");
  cy.contains("Forms").click();
  cy.contains("Form Layouts").click();
});

it("Cypress Locator Methods", () => {
  // Theory
  // get() -> to find elements on the page globally
  // find() -> used to find only child elements
  // contains() -> to find web elements by text

  cy.contains("Emai");
  cy.contains("Sign in"); // finds the first one in the dom it is case sensitive but can be disabled as follows // cy.get() finds all of them
  cy.contains("Sign In", { matchCase: false }); // note the capital I, it still finds it even though the text does not match
  cy.contains("Sig"); // also finds it doesnt have to be the whole text
  cy.contains('[status="warning"]', "Sig"); // this is using 2 elements toghether, the status attribute and the text it contains
  cy.contains("nb-card", "Horizontal").find('button').contains('Sign in') // chaining methods
});
