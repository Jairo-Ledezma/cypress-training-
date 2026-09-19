declare namespace Cypress {
  interface Chainable {
    /**
     * Command to open the homepage of application
     */
    openHomePage(): Chainable<void>;
  }
}
