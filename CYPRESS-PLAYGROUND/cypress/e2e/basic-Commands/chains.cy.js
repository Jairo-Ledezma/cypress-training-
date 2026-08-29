///<reference types="cypress"/>

/*In Cypress, a chain is a sequence of Cypress commands where each command usually works with whatever the previous command yielded.
For example:

cy.get("nb-card")
  .contains("Horizontal")
  .find("button")
  .click()

You can read that almost like a sentence:

Get the nb-card → inside it find something containing "Horizontal" → from that result find a button → click it.*/

beforeEach("Chains", () => {
  cy.visit("/");
  cy.contains("Forms").click();
  cy.contains("Form Layouts").click();
});

it("Chain example", () => {
  cy.get("#inputEmail1") // get the element with that id
    .parents("form") //go to the parent form
    .find("button") // inside the form parent find a button
    .click() // click the button and returns the context of the button
    .parents("form") // go back to the parent form -> even though this can be done it is not recommended to continue the chain once an action like a click has been made
    .find("nb-radio") //find the element with tag nb-radio
    .first() // focus on the first element with the tag nb-radio
    .should("have.text", "Option 1"); // assert that the text in that is Option 1
});

// sometimes actions changes the DOM and because of that, chaining after an action is done can produce errors since cypress still relays on the DOM that was before the click, cypress
//does not have context of the DOM after the action was made

//the following example is the best practice form of the above

it("chain example best practice", () => {
  cy.get("#inputEmail1").parents("form").find("button").click(); // at this point we finish this chain

  cy.get("#inputEmail1") // then after the action was done we start another chain, this way cypress gets a new context of the dom after the action was made
    .parents("form")
    .find("nb-radio")
    .first()
    .should("have.text", "Option 1");
});
