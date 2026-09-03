///<reference types="cypress" />

beforeEach("Page navigation", () => {
  // Visit the base URL configured in cypress.config.js
  cy.visit("/");

  // Navigate to the Forms section
  cy.contains("Forms").click();

  // Open the Form Layouts page
  cy.contains("Form Layouts").click();
});

it("Radio buttons using index with force true explanation", () => {
  // Find the nb-card that contains the text "Using the Grid"
  // This limits the following search to only this specific card.
  cy.contains("nb-card", "Using the Grid")

    // Find all the actual <input type="radio"> elements inside the card.
    // NOTE:
    // These radio inputs are visually hidden by the UI library.
    // The user actually sees and clicks a styled <span> element
    // (in this case <span class="outer-circle">) that is placed over
    // the real radio input.
    .find('[type="radio"]')

    // .then() gives us the complete collection of radio buttons found above.
    .then((allRadioButtons) => {
      // Wrap the jQuery collection so we can continue using Cypress commands.
      // .eq(0) selects the first radio button from the collection.
      //
      // A normal .check() would fail because Cypress detects that the real
      // <input> is covered by the visible <span class="outer-circle">.
      //
      // { force: true } tells Cypress to skip its normal actionability checks
      // (such as checking whether the element is visible or covered)
      // and perform the check directly on the radio input.
      cy.wrap(allRadioButtons)
        .eq(0)
        .check({ force: true })
        .should("be.checked");
      cy.wrap(allRadioButtons).eq(1).check({ force: true });
      cy.wrap(allRadioButtons).eq(0).should("not.be.checked");
      cy.wrap(allRadioButtons).eq(2).should("be.disabled");
    });
});

it("radio buttons using labels", () => {
  // Find the "Using the Grid" card, then find the element that contains
  // the text "Option 1" and click it.
  //
  // In this case, Cypress clicks the visible label/text associated with
  // the radio button instead of interacting directly with the hidden input.
  cy.contains("nb-card", "Using the Grid").contains("Option 1").click();

  // Find the "Using the Grid" card again so the search is limited
  // to this specific section of the page.
  cy.contains("nb-card", "Using the Grid")

    // Find the <label> element that contains the text "Option 2".
    // Using "Label" makes the selector more specific than searching
    // for the text "Option 2" alone.
    .contains("Label", "Option 2")

    // Find the actual <input> element located inside the Option 2 label.
    // This is the real radio input associated with the visible label.
    .find("input")

    // Check the radio button.
    //
    // { force: true } is required because the actual radio <input>
    // is visually hidden/covered by the styled radio button elements.
    // Cypress would normally fail its actionability checks because
    // the input cannot be directly interacted with like a visible element.
    //
    // force: true skips those checks and checks the input directly.
    .check({ force: true });
});
