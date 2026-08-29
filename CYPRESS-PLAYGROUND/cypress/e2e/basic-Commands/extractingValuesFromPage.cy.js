///<reference types='cypress'/>

beforeEach("page navigation", () => {
  cy.visit("/");
  cy.contains("Forms").click();
  cy.contains("Form Layouts").click();
});

it("Extracting values from page", () => {

  // 1. EXTRACTING TEXT USING A JQUERY METHOD
  // cy.get() yields the <label> element as a jQuery object.
  // Inside .then(), we have access to that yielded jQuery object through
  // the "label" parameter.
  // Since it is a jQuery object, we can use the jQuery .text() method
  // to extract the text contained inside the label.
  cy.get('[for="exampleInputEmail1"]').then((label) => {
    const labelText = label.text();

    console.log(labelText + " using the text() jQuery method");
  });


  // 2. EXTRACTING TEXT USING THE CYPRESS .invoke() COMMAND
  // Instead of using .then() and calling the jQuery .text() method manually,
  // Cypress can invoke the text() method directly on the yielded element.
  // .invoke("text") changes the yielded subject from the <label> element
  // to the text contained inside that element.
  cy.get('[for="exampleInputEmail1"]')
    .invoke("text")
    .then((emailLabel) => {
      console.log(emailLabel + " using the invoke command");
    });


  // CREATING AN ALIAS FROM AN EXTRACTED VALUE
  // First, Cypress gets the label element.
  // .invoke("text") extracts its text.
  // .as("labelText") stores that extracted text under the alias @labelText.
  cy.get('[for="exampleInputEmail1"]')
    .invoke("text")
    .as("labelText");


  // ASSERTING TEXT DIRECTLY ON THE ELEMENT
  // There is no need to extract the text first if we only want to verify it.
  // This checks that the <label> element contains the text "Email address".
  cy.get('[for="exampleInputEmail1"]')
    .should("contain", "Email address");


  // ASSERTING THE EXTRACTED TEXT USING THE ALIAS
  // @labelText contains the text that was previously extracted with
  // .invoke("text"), so we can perform an assertion directly on that value.
  cy.get("@labelText")
    .should("contain", "Email address");


  // 3. EXTRACTING AN HTML ATTRIBUTE VALUE
  // .invoke("attr", "class") calls jQuery's attr() method on the input
  // and extracts the value of its "class" attribute.
  // The yielded subject is now the class attribute value as a string,
  // instead of the original <input> element.
  cy.get("#exampleInputEmail1")
    .invoke("attr", "class")
    .then((classValue) => {
      console.log(
        classValue +
          " using invoke('attr', 'class') to extract the class attribute",
      );
    });


  // ASSERTING AN ATTRIBUTE WITHOUT EXTRACTING IT FIRST
  // If we only need to verify the attribute, we do not need .invoke().
  // "have.attr" checks that the input's class attribute exactly matches
  // the expected string below.
  cy.get("#exampleInputEmail1").should(
    "have.attr",
    "class",
    "input-full-width size-medium status-basic shape-rectangle nb-transition",
  );


  // 4. EXTRACTING THE VALUE OF AN INPUT FIELD
  // First, type a value into the email input.
  cy.get("#exampleInputEmail1")
    .type("hello@test.com");


  // The text typed into an <input> is stored in its "value" property.
  // .invoke("prop", "value") extracts that property from the input.
  // The value "hello@test.com" is then yielded to .then() through
  // the "text" parameter.
  cy.get("#exampleInputEmail1")
    .invoke("prop", "value")
    .then((text) => {
      console.log(
        text + " printed using invoke('prop', 'value')",
      );
    });


  // ASSERTING AN INPUT VALUE WITHOUT EXTRACTING IT FIRST
  // We do not need to use .invoke("prop", "value") just to verify the value.
  // "have.value" directly checks the current value stored in the input.
  cy.get("#exampleInputEmail1")
    .should("have.value", "hello@test.com");

});