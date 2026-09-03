beforeEach("page navigation", () => {
  // Visit the base URL configured in cypress.config.js.
  cy.visit("/");

  // Open the "Modal & Overlays" section from the navigation menu.
  cy.contains("Modal & Overlays").click();

  // Open the "Toastr" page before each test.
  cy.contains("Toastr").click();
});

it("native dropdown", () => {
  // Find the <div> element that contains the text "Toast type:".
  // This limits the following search to the specific section
  // where the native dropdown is located.
  cy.contains("div", "Toast type:")

    // Find the <select> element inside that section.
    // A <select> element represents a native HTML dropdown.
    .find("select")

    // Select the option whose value is "info".
    // Cypress automatically changes the selected option
    // in the native <select> element.
    .select("info")

    // Verify that the dropdown now has "info" as its selected value.
    // This assertion confirms that .select() changed the value successfully.
    .should("have.value", "info");
});