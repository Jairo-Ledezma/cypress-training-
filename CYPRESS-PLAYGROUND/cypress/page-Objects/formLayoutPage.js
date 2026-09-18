class FormLayoutsPage {
  submitUsingTheGridForm1(email, password, option) {
    cy.get("#inputEmail1").type(email);
    cy.get("#inputPassword2").type(password);
    cy.contains(`Option ${option}`).click();
    cy.contains("Sign in").click();
  }

  submitUsingTheGridForm2(email, password, option) {
    cy.contains("nb-card", "Using the Grid").then((form) => {
      cy.wrap(form).find('[placeholder="Email"]').type(email);
      cy.wrap(form).find('[placeholder="Password"]').type(password);
      cy.wrap(form).find("[type = radio]").eq(option).check({ force: true });
      cy.wrap(form).contains("Sign in").click();
    });
  }

  submitBasicForm(email, password, isCheckboxSelected) {
    cy.contains("nb-card", "Basic form").then((form) => {
      cy.wrap(form).find('[placeholder="Email"]').type(email);
      cy.wrap(form).find('[placeholder="Password"]').type(password);

      if (isCheckboxSelected) {
        cy.wrap(form).find("[type=checkbox]").check({ force: true });
      }

      cy.wrap(form).contains("Submit").click();
    });
  }
}

export const onFormsLayoutsPage = new FormLayoutsPage();
