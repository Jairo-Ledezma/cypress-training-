///<reference types='cypress'/>

import { navigateTo } from "../../page-Objects/navigationPage";

beforeEach("Page navigation", () => {
  cy.visit("/");
});

it("navigation test", () => {
  navigateTo.formLayoutsPage();
  navigateTo.datePickerPage();
  navigateTo.dialogPage();
  navigateTo.windowPage();
  navigateTo.popOverPage();
  navigateTo.toastrPage();
  navigateTo.tooltipPage();
  navigateTo.calendarPage();
  navigateTo.dragAndDropPage();
  navigateTo.echartsPage();
  navigateTo.loginPage();
  navigateTo.pdfDownloadPage();
  navigateTo.registerPage();
  navigateTo.requestPasswordPage();
  navigateTo.resetPasswordPage();
  navigateTo.tablesAndData();
  navigateTo.treeGridPage();
});
