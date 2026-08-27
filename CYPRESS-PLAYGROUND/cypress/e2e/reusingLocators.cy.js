/// <reference types='cypress'/>

beforeEach("page navigation", () => {
  cy.visit("/");
  cy.contains("Forms").click();
  cy.contains("Form Layouts").click();
});

it("reusing locators", () => {
  // Cypress commands do not return the actual DOM element immediately.
  // They return a Cypress Chainable, so saving it in a normal variable
  // and trying to reuse it later is not the recommended Cypress approach.
  // THIS WILL NOT WORK!!! DON'T DO IT LIKE THIS!!!

  // const inputEmail1 = cy.get("#inputEmail1");
  // inputEmail1.parents("form").find("button");
  // inputEmail1.parents("form").find("nb-radio");

  // 1. CYPRESS ALIAS
  // Find the element with id="inputEmail1" and save a Cypress reference
  // to it using the alias name "inputEmail1".

  cy.get("#inputEmail1").as("inputEmail1");

  // Retrieve the previously created alias with @inputEmail1.
  // From the input, go up through its ancestors until finding the form,
  // then search inside that form for a button.

  cy.get("@inputEmail1").parents("form").find("button");

  // Reuse the same alias again.
  // Go from the email input up to the form,
  // then find all nb-radio elements inside that form.

  cy.get("@inputEmail1").parents("form").find("nb-radio");

  // 2. CYPRESS then() METHOD
  // Find #inputEmail1 and wait until Cypress resolves the command.
  // then() gives us access to the yielded element through the
  // inputEmail parameter.

  cy.get("#inputEmail1").then((inputEmail) => {
    // inputEmail is now the yielded jQuery element.
    // cy.wrap() puts that element back into a Cypress chain
    // so Cypress commands such as parents() and find() can be used.

    cy.wrap(inputEmail).parents("form").find("button");

    // Wrap the same element again so it can be reused
    // in another independent Cypress chain.

    cy.wrap(inputEmail).parents("form").find("nb-radio");

    // cy.wrap() can also wrap normal JavaScript values,
    // not only DOM elements.
    // Here, Cypress wraps the string "Hello" and then
    // verifies that its value equals "Hello".

    cy.wrap("Hello").should("equal", "Hello");

    // Wrap the input element again and create another Cypress alias.
    // This makes the element available outside this then() callback
    // under the name @inputEmail2.

    cy.wrap(inputEmail).as("inputEmail2");
  });

  // Retrieve the alias that was created inside then()
  // and click the email input.

  cy.get("@inputEmail2").click();
});
