declare namespace Cypress {
  interface Chainable {
    /**
     * this method will log the user to the app
     */
    login(): Chainable<void>;
  }
}
