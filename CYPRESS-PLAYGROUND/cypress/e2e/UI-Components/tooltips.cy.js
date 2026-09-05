
///<reference types='cypress'/>

// Runs before each test.
// "page navigation" is the name/description of this hook.
beforeEach("page navigation", () => {

  // Opens the application's base URL configured in cypress.config.js.
  cy.visit("/");

  // Finds an element containing the text "Modal & Overlays"
  // and clicks it to navigate to that section.
  cy.contains("Modal & Overlays").click();

  // Finds an element containing the text "Tooltip"
  // and clicks it to open the Tooltip page.
  cy.contains("Tooltip").click();
});


it("Tooltip", () => {

  // Finds a <button> element containing the text "Top".
  //
  // cy.contains(selector, text)
  //   selector = "button" → only search <button> elements
  //   text     = "Top"    → look for a button containing "Top"
  //
  // .trigger("mouseenter")
  // manually triggers the mouseenter event on the button.
  // This simulates the mouse pointer moving over the button,
  // which should cause the tooltip to appear.
  cy.contains("button", "Top").trigger("mouseenter");

  // Finds the <nb-tooltip> element created/displayed by the application.
  //
  // .should("have.text", "This is a tooltip")
  // verifies that the tooltip contains exactly the expected text.
  //
  // "have.text" is a Chai-jQuery assertion used by Cypress.
  cy.get("nb-tooltip").should("have.text", "This is a tooltip");
});

