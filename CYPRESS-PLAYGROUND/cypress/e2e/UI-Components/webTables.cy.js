///<reference types='cypress'/>

// beforeEach() is a Mocha/Cypress hook that runs before EVERY test.
//
// It receives two arguments:
//
// 1. "Page Navigation"
//    → A descriptive name for the hook.
//
// 2. () => { ... }
//    → A callback function containing the commands Cypress should execute
//      before each test.
//
// Since both tests need to be on the Smart Table page, we put the
// navigation here so we don't have to repeat it in every test.
beforeEach("Page Navigation", () => {
  // cy.visit() navigates the browser to a URL.
  //
  // Parameter:
  //   "/" → the relative URL we want to visit.
  //
  // "/" refers to the baseUrl configured in cypress.config.js.
  cy.visit("/");

  // cy.contains() searches the page for an element containing
  // the specified text.
  //
  // Parameter:
  //   "Tables & Data" → the text Cypress searches for.
  //
  // .click() simulates a user clicking the element Cypress found.
  cy.contains("Tables & Data").click();

  // Search for an element containing the text "Smart Table".
  //
  // .click() then clicks that element to navigate to the Smart Table page.
  cy.contains("Smart Table").click();
});

// ============================================================================
// TEST 1
// Finding a table row using a UNIQUE VALUE (text)
// ============================================================================

it("managing web tables finding rows in the table with unique values (text)", () => {
  // cy.get() searches the DOM using a CSS selector.
  //
  // Parameter:
  //   "tbody"
  //
  // This selects the <tbody> element of the table.
  //
  // A table normally has a structure similar to:
  //
  // <table>
  //   <thead>...</thead>
  //   <tbody>
  //     <tr>...</tr>
  //     <tr>...</tr>
  //   </tbody>
  // </table>
  //
  // Starting from <tbody> limits our search to the table's data rows.
  cy.get("tbody")

    // .contains() can be chained from another Cypress command.
    //
    // Here it receives TWO parameters:
    //
    //   .contains(selector, text)
    //
    // 1. "tr"
    //    → Search specifically for <tr> elements.
    //
    // 2. "Larry"
    //    → Search for a row containing the text "Larry".
    //
    // This is useful when we don't have a unique ID or other identifier
    // for the row.
    //
    // Cypress searches the <tbody> and finds the <tr> containing "Larry".
    //
    // The result is yielded to the next command in the chain.
    .contains("tr", "Larry")

    // .then() allows us to work with the element yielded by the previous
    // Cypress command.
    //
    // .then() receives ONE argument here:
    //
    //   callback function
    //
    // Cypress passes the element found by .contains() into that callback.
    //
    // We name that element "tableRow".
    //
    // "tableRow" is now a jQuery object representing the <tr> containing
    // "Larry".
    .then((tableRow) => {
      // cy.wrap() takes a value and turns it into a Cypress chainable
      // object.
      //
      // Parameter:
      //   tableRow
      //
      // Why do we need cy.wrap()?
      //
      // The variable "tableRow" is a jQuery object received inside .then().
      // To continue using Cypress commands such as .find(), we wrap it
      // back into the Cypress command chain.
      //
      // In other words:
      //
      //   tableRow
      //       ↓
      //   cy.wrap(tableRow)
      //       ↓
      //   Cypress chainable
      //
      // .find() then searches INSIDE that specific table row.
      //
      // Parameter:
      //   ".nb-edit"
      //
      // This searches for the edit button inside Larry's row.
      //
      // .click() simulates clicking the edit button.
      cy.wrap(tableRow).find(".nb-edit").click();

      // Again, cy.wrap(tableRow) converts the jQuery object back into
      // a Cypress chainable.
      //
      // .find('[placeholder="Age"]')
      // searches ONLY inside Larry's row for an element whose placeholder
      // attribute is "Age".
      //
      // The selector:
      //
      //   [placeholder="Age"]
      //
      // is an attribute selector.
      //
      // .clear() removes any existing value from the input.
      //
      // .clear() does not require any parameters.
      //
      // .type("35") types the characters "35" into the input.
      //
      // .type() receives the text/keystrokes that Cypress should enter.
      cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("35");

      // Find the checkmark button inside the same table row.
      //
      // ".nb-checkmark" is the CSS class identifying the save/check button.
      //
      // .click() clicks that button to save the edited value.
      cy.wrap(tableRow).find(".nb-checkmark").click();

      // We still have the same table row stored in "tableRow".
      //
      // .find("td")
      // searches inside that row for all <td> elements.
      //
      // .last()
      // selects the LAST <td> from the collection.
      //
      // .should() performs an assertion.
      //
      // It receives TWO arguments here:
      //
      //   1. "have.text"
      //      → The assertion Cypress should perform.
      //
      //   2. "35"
      //      → The expected text.
      //
      // Therefore this verifies that the LAST column of Larry's row
      // contains the new age value "35".
      cy.wrap(tableRow).find("td").last().should("have.text", "35");
    });
});

// ============================================================================
// TEST 2
// Finding a table row using an INDEX
// Adding a new value to the table
// ============================================================================

it("managing web tables finding rows in the table with index (no identifiers) adding a new value to the table", () => {
  // cy.get(".nb-plus")
  // searches for the element with the CSS class ".nb-plus".
  //
  // This is the "+" button used to add a new row.
  //
  // .click() simulates clicking the button.
  cy.get(".nb-plus").click();

  // cy.get("thead tr")
  //
  // Selects all <tr> elements inside the table's <thead>.
  //
  // .eq(2)
  // selects an element based on its INDEX.
  //
  // Important:
  // Cypress/jQuery indexes are zero-based.
  //
  // Therefore:
  //
  //   .eq(0) → first element
  //   .eq(1) → second element
  //   .eq(2) → third element
  //
  // In this case, the third <tr> inside <thead> represents the row
  // containing the input fields for adding a new record.
  cy.get("thead tr")
    .eq(2)

    // .then() receives the element selected by .eq(2).
    //
    // We store that element in the variable "tableRow".
    //
    // This allows us to repeatedly search inside this particular row
    // instead of searching the entire page every time.
    .then((tableRow) => {
      // Wrap the tableRow so we can use Cypress commands on it.
      //
      // .find('[placeholder="First Name"]')
      // searches inside this row for the input whose placeholder is
      // "First Name".
      //
      // .type("Jairo")
      // types "Jairo" into that input.
      cy.wrap(tableRow).find('[placeholder="First Name"]').type("Jairo");

      // Find the Last Name input inside the same row.
      //
      // .type("Ledezma") types the specified text into the input.
      cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Ledezma");

      // Find the Username input inside the same row.
      //
      // .type("Pacman") enters "Pacman" into the input.
      cy.wrap(tableRow).find('[placeholder="Username"]').type("Pacman");

      // Find the E-mail input inside the same row.
      //
      // .type("test@test.com") enters the email address.
      cy.wrap(tableRow).find('[placeholder="E-mail"]').type("test@test.com");

      // Find the Age input inside the same row.
      //
      // Notice that spaces inside the attribute selector don't matter:
      //
      //   [placeholder = "Age"]
      //
      // is equivalent to:
      //
      //   [placeholder="Age"]
      //
      // .type("38") enters the age.
      cy.wrap(tableRow).find('[placeholder = "Age"]').type("38");

      // Find the checkmark button inside the input row.
      //
      // .click() clicks the checkmark to save the new record.
      cy.wrap(tableRow).find(".nb-checkmark").click();
    });

  // ==========================================================================
  // VERIFY THE NEW ROW
  // ==========================================================================

  // cy.get("tbody tr")
  //
  // Finds all <tr> elements inside the <tbody>.
  //
  // These represent the data rows in the table.
  //
  // .first()
  // selects the FIRST row from those results.
  //
  // .find("td")
  // finds all <td> cells inside that first row.
  //
  // .then()
  // receives the collection of <td> elements and stores it in
  // the variable "tableColumns".
  cy.get("tbody tr")
    .first()
    .find("td")
    .then((tableColumns) => {
      // cy.wrap(tableColumns)
      //
      // Converts the jQuery collection into a Cypress chainable.
      //
      // .eq(2)
      // selects the cell at index 2.
      //
      // Remember that indexes start at 0:
      //
      //   0 → first cell
      //   1 → second cell
      //   2 → third cell
      //
      // .should("have.text", "Jairo")
      // verifies that the selected cell contains exactly the expected text.
      //
      // This verifies the First Name value.
      cy.wrap(tableColumns).eq(2).should("have.text", "Jairo");

      // Select the fourth cell (index 3).
      //
      // Verify that its text is "Ledezma".
      //
      // This verifies the Last Name value.
      cy.wrap(tableColumns).eq(3).should("have.text", "Ledezma");

      // Select the fifth cell (index 4).
      //
      // Verify that its text is "Pacman".
      //
      // This verifies the Username value.
      cy.wrap(tableColumns).eq(4).should("have.text", "Pacman");

      // Select the sixth cell (index 5).
      //
      // Verify that its text is "test@test.com".
      //
      // This verifies the E-mail value.
      cy.wrap(tableColumns).eq(5).should("have.text", "test@test.com");

      // Select the seventh cell (index 6).
      //
      // Verify that its text is "38".
      //
      // This verifies the Age value.
      cy.wrap(tableColumns).eq(6).should("have.text", "38");
    });
});
