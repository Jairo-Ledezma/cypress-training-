/// <reference types='cypress'/>

beforeEach("page navigation", () => {
  cy.visit("/");
  cy.contains("Forms").click();
  cy.contains("Form Layouts").click();
});

it("assertions", () => {

  // 1. CYPRESS ASSERTION: should("contain")
  // cy.get() finds the label associated with #exampleInputEmail1.
  // "contain" checks whether the element contains the expected text somewhere
  // inside it.
  // This does NOT require the entire text content to be exactly equal.
  cy.get('[for="exampleInputEmail1"]')
    .should("contain", "Email address");


  // 2. CHAI ASSERTION INSIDE .then(): expect(...).to.contain()
  // .then() gives us access to the yielded jQuery element through "label".
  // We then use Chai's expect() assertion syntax instead of Cypress .should().
  // This verifies that the label contains the text "Email address".
  cy.get('[for="exampleInputEmail1"]').then((label) => {

    expect(label).to.contain("Email address");

  });


  // 3. CYPRESS ASSERTION: should("have.text")
  // "have.text" checks the COMPLETE text content of the element.
  // Unlike "contain", this expects the text to match exactly.
  cy.get('[for="exampleInputEmail1"]')
    .should("have.text", "Email address");


  // 4. CHAI ASSERTION: expect(...).to.have.text()
  // The same exact-text assertion can also be performed inside .then()
  // using Chai's expect() syntax.
  cy.get('[for="exampleInputEmail1"]').then((label) => {

    expect(label).to.have.text("Email address");

  });


  // 5. EXTRACTING THE TEXT BEFORE ASSERTING IT
  // .invoke("text") calls the text() method on the label and changes
  // the yielded subject from the jQuery element to a plain string.
  //
  // At this point, emailLabel contains:
  // "Email address"
  cy.get('[for="exampleInputEmail1"]')
    .invoke("text")
    .then((emailLabel) => {

      // Chai assertion on the extracted string.
      // "equal" requires an exact match.
      expect(emailLabel).to.equal("Email address");


      // The same extracted string can be wrapped back into a Cypress chain.
      // This allows us to use Cypress .should() assertions on a normal
      // JavaScript value.
      cy.wrap(emailLabel)
        .should("equal", "Email address");

    });


  // 6. ASSERTING THAT THE ELEMENT EXISTS
  // "exist" verifies that Cypress was able to find the label in the DOM.
  cy.get('[for="exampleInputEmail1"]')
    .should("exist");


  // 7. ASSERTING THAT THE ELEMENT IS VISIBLE
  // "be.visible" verifies that the label is currently visible to the user.
  cy.get('[for="exampleInputEmail1"]')
    .should("be.visible");


  // 8. ASSERTING THE ELEMENT'S ATTRIBUTE
  // We already know this label was selected using:
  // [for="exampleInputEmail1"]
  //
  // Therefore, we can safely verify that its "for" attribute has that value.
  cy.get('[for="exampleInputEmail1"]')
    .should("have.attr", "for", "exampleInputEmail1");


  // 9. ASSERTING MULTIPLE CONDITIONS IN THE SAME CHAIN
  // Cypress can continue yielding the same element through multiple
  // .should() assertions.
  //
  // Here we verify that the label:
  // - exists
  // - is visible
  // - contains the expected text
  // - has the expected "for" attribute
  cy.get('[for="exampleInputEmail1"]')
    .should("exist")
    .and("be.visible")
    .and("contain", "Email address")
    .and("have.attr", "for", "exampleInputEmail1");


  // 10. ASSERTING THE EXTRACTED TEXT IS A STRING
  // Since .invoke("text") returns the text content,
  // the resulting value should be a JavaScript string.
  cy.get('[for="exampleInputEmail1"]')
    .invoke("text")
    .should("be.a", "string");


  // 11. ASSERTING THAT THE EXTRACTED TEXT IS NOT EMPTY
  // After extracting the label text, we can verify that the resulting
  // string has a length greater than 0.
  cy.get('[for="exampleInputEmail1"]')
    .invoke("text")
    .should("not.be.empty");

});
