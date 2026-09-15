///<reference types='cypress'/>

// Runs before each test.
// Navigates to the application and opens the Drag & Drop page.
beforeEach("page navigation", () => {
  // Opens the application using the baseUrl configured in Cypress.
  cy.visit("/");

  // Finds the "Extra Components" navigation item and clicks it.
  cy.contains("Extra Components").click();

  // Finds the "Drag & Drop" navigation item and clicks it.
  cy.contains("Drag & Drop").click();
});

it("drag and drop automation", () => {
  // Find all <div> elements inside the todo list
  // and select the first one.
  //
  // .first() selects the first matching element.
  //
  // .trigger("dragstart") manually fires the browser's
  // "dragstart" event on that element.
  //
  // This simulates the beginning of a drag operation.
  cy.get("#todo-list div").first().trigger("dragstart");

  // Find the element that represents the drop area.
  //
  // .trigger("drop") manually fires the browser's
  // "drop" event on that element.
  //
  // This simulates dropping the item into the drop zone.
  cy.get("#drop-list").trigger("drop");
});
