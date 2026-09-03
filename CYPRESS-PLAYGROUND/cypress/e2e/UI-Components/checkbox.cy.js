/// <reference types="cypress" />

beforeEach("page navigation", () => {
  // Visit the base URL configured in cypress.config.js.
  cy.visit("/");

  // Open the "Forms" section from the navigation menu.
  cy.contains("Forms").click();

  // Open the "Form Layouts" page before each test.
  cy.contains("Form Layouts").click();
});

it("checkboxes", () => {
  // Find the card that contains the text "Horizontal form".
  // This limits the search for checkboxes to this specific card.
  cy.contains("nb-card", "Horizontal form")

    // Find all checkbox inputs inside the "Horizontal form" card.
    .find('[type="checkbox"]')

    // Check the checkbox.
    //
    // { force: true } is used because the real checkbox input may be
    // visually hidden or covered by a styled UI element.
    // Cypress would normally refuse to interact with an element that
    // is not considered actionable, so force: true skips those checks.
    .check({ force: true });
});

it("checkboxes on Modal & Overlays", () => {
  // Open the "Modal & Overlays" section from the navigation menu.
  cy.contains("Modal & Overlays").click();

  // Open the "Toastr" page.
  cy.contains("Toastr").click();

  // Find the "Toaster configuration" card and locate its checkbox inputs.
  cy.contains("nb-card", "Toaster configuration")
    .find("[type=checkbox]")

    // Check the checkbox.
    // if a checkbox is already checked it wont uncheck it uncheck() is used for that
    // force: true bypasses Cypress actionability checks in case
    // the actual input is hidden or covered by a custom styled element.
    .check({ force: true });

  // Find the same checkbox inputs again inside the
  // "Toaster configuration" card.
  cy.contains("nb-card", "Toaster configuration")
    .find("[type=checkbox]")

    // Uncheck the checkbox.
    //if a checkbox is already unchecked it wont check it check() is used for that
    // Just like .check(), .uncheck() normally requires the element
    // to be visible and actionable, so force: true bypasses those checks.
    .uncheck({ force: true });

  // Find the checkbox inputs inside the "Toaster configuration" card again.
  cy.contains("nb-card", "Toaster configuration")
    .find("[type=checkbox]")

    // Click all checkbox inputs that were found.
    // as opposed to the check()/uncheck() methods a click will in fact check or uncheck a method
    // force: true allows Cypress to click the inputs even if they are
    // hidden or covered by another styled element.
    //
    // multiple: true is required because .find() may return more than
    // one checkbox. By default, .click() expects a single element.
    // multiple: true tells Cypress to click every matched checkbox.
    .click({ force: true, multiple: true });
});
