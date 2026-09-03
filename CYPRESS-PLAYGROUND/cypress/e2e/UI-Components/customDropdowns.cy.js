/// <reference types="cypress" />

beforeEach("page navigation", () => {
  // Visit the base URL configured in cypress.config.js.
  cy.visit("/");

  // Open the "Modal & Overlays" section from the navigation menu.
  cy.contains("Modal & Overlays").click();

  // Open the "Toastr" page before each test.
  cy.contains("Toastr").click();
});

it("custom dropdowns", () => {
  // Find the <div> that contains the text "Position",
  // then find the custom <nb-select> dropdown inside it
  // and click it to open the list of available options.
  cy.contains("div", "Position").find("nb-select").click();

  // Find the dropdown option list and click the option
  // whose visible text is "bottom-start".
  cy.get(".option-list").contains("bottom-start").click();

  // Find the Position dropdown again.
  cy.contains("div", "Position")
    .find("nb-select")

    // Verify that the dropdown now displays "bottom-start",
    // confirming that the correct option was selected.
    .should("have.text", "bottom-start");
});

it("selecting and validating all options", () => {
  // Find the custom dropdown inside the section that contains "Position".
  cy.contains("div", "Position")
    .find("nb-select")

    // .then() gives us access to the dropdown element that Cypress found.
    // The "dropdown" parameter represents that element as a jQuery object.
    .then((dropdown) => {
      // Wrap the jQuery dropdown element so we can use Cypress commands on it.
      // Click it to open the dropdown options.
      cy.wrap(dropdown).click();

      // Find all <nb-option> elements inside the dropdown list.
      //
      // .each() loops through every option that Cypress found.
      //
      // The callback receives three parameters:
      //
      // option:
      // Represents the current <nb-option> being processed.
      // It is a jQuery-wrapped DOM element.
      //
      // index:
      // Represents the position of the current option in the collection.
      // The first option has index 0, the second has index 1, and so on.
      //
      // list:
      // Represents the complete collection of <nb-option> elements
      // found by cy.get().
      cy.get(".option-list nb-option").each((option, index, list) => {
        // Wrap the current option so we can use Cypress commands on it,
        // then click it to select that option.
        cy.wrap(option).click();

        // Get the visible text of the current option with option.text().
        //
        // Then verify that the dropdown displays the same text,
        // confirming that the option was successfully selected.
        cy.wrap(dropdown).should("have.text", option.text());

        // After selecting an option, the dropdown automatically closes.
        //
        // index contains the position of the current option.
        // list.length contains the total number of options.
        //
        // Because indexes start at 0, the last option's index is:
        //
        // list.length - 1
        //
        // Therefore, this condition checks whether the current option
        // is NOT the last option in the list.
        if (index < list.length - 1) {
          // Reopen the dropdown so the next option can be selected
          // during the next iteration of .each().
          cy.wrap(dropdown).click();
        }
      });
    });
});