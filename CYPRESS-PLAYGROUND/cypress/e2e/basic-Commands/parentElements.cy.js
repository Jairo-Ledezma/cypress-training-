///<reference types= "cypress"/>

beforeEach("page navigaton", () => {
  cy.visit("/");
  cy.contains("Forms").click();
  cy.contains("Form Layouts").click();
});

it("Parent Elements", () => {
  cy.get("#inputEmail1").parents("form").find("button"); // this moves up to the parent element with a form tag then finds within that element a button // ALL levels above

  cy.contains("Using the Grid").parent().find("button"); // this parent goes to the immediate parent and then finds the button you can add as many parents as needed // one level above

  cy.get("#inputEmail1").parentsUntil("nb-card-body").find("button"); // this will traverse up until nb-card-body and land on one prior 
});
