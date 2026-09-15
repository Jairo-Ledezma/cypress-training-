///<reference types='cypress'/>

// Runs before each test.
// Navigates to the application and opens the Dialog page.
beforeEach("page navigation", () => {
  // Opens the application using the baseUrl configured in Cypress.
  cy.visit("/");

  // Opens the "Modal & Overlays" section from the navigation.
  cy.contains("Modal & Overlays").click();

  // Opens the "Dialog" page.
  cy.contains("Dialog").click();
});

it("iframes", () => {
  // Verify that the iframe has been loaded.
  //
  // [data-cy="esc-close-iframe"]
  //     Selects the iframe using its data-cy attribute.
  //
  // frameLoaded()
  //     Comes from the Cypress iframe plugin.
  //     It waits for the iframe to finish loading before
  //     we attempt to interact with its contents.
  cy.frameLoaded('[data-cy="esc-close-iframe"]');

  // Access the contents of the iframe.
  //
  // cy.iframe()
  //     Gets the document/body inside the iframe so Cypress
  //     can interact with elements inside it.
  //
  // .contains()
  //     Searches for the text inside the iframe.
  //
  // .click()
  //     Clicks the button/link containing that text.
  cy.iframe('[data-cy="esc-close-iframe"]')
    .contains("Open Dialog with esc close")
    .click();

  // Wait 5 seconds.
  //
  // This gives the dialog time to appear before continuing.
  // In general, Cypress's automatic waiting/assertions are
  // preferable to fixed waits, but this can be useful while
  // learning or when reproducing the course example.
  cy.wait(5000);

  // The dialog is displayed outside of the iframe.
  //
  // Therefore, we use cy.contains() normally instead of
  // cy.iframe() to find the "Dismiss Dialog" button.
  cy.contains("Dismiss Dialog").click();

  // ---------------------------------------------------------
  // Using cy.enter() to work inside the iframe
  // ---------------------------------------------------------

  // Enter the iframe and execute the commands inside it.
  //
  // cy.enter() comes from the Cypress iframe plugin.
  // It gives us access to the iframe's body through the
  // callback parameter.
  cy.enter('[data-cy="esc-close-iframe"]').then((getBody) => {
    // getBody() returns the body/document of the iframe.
    //
    // .contains() searches for the button inside the iframe,
    // and .click() clicks it.
    getBody().contains("Open Dialog with esc close").click();

    // The dialog itself is outside the iframe,
    // so we can find it using normal Cypress commands.
    cy.contains("Dismiss Dialog").click();

    // Find the second button inside the iframe.
    //
    // Notice the extra space at the end of the text:
    // "Open Dialog without esc close "
    //
    // The text must match what actually exists in the DOM
    // when using this selector.
    getBody().contains("Open Dialog without esc close ").click();

    // Click the "OK" button in the dialog.
    //
    // Like "Dismiss Dialog", this dialog is outside the iframe,
    // so we use cy.contains() normally.
    cy.contains("OK").click();
  });
});
