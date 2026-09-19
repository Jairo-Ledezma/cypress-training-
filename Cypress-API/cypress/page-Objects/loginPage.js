class LoginPage {
  /**
   * this method will login to the app
   */
  loginFlow() {
    cy.contains("Sign in").click();
    cy.get('[placeholder="Email"]').type("test@jairo.com");
    cy.get('[placeholder="Password"]').type("helloworld");
    cy.get('[type="submit"]').click();
  }
}

export const onLoginPage = new LoginPage();
