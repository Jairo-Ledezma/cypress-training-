beforeEach("page navigation", () => {
  cy.visit("/");
  cy.contains("Modal").click();
  cy.contains("Dialog").click();
});

it("Timeouts", () => {
  cy.contains("Open with delay 10 seconds").click();
  cy.get("nb-dialog-container nb-card-header", { timeout: 11000 }).should(
    "have.text",
    "Friendly reminder",
  ); // line 9 has a local command that will make cypress wait at least 11 seconds before failing
});
