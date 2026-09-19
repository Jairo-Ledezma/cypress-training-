///<reference types='cypress'/>

import { onDatePickerPage } from "../../page-Objects/datePickerPage";
import { onFormsLayoutsPage } from "../../page-Objects/formLayoutPage";
import { navigateTo } from "../../page-Objects/navigationPage";

beforeEach("Page Navigation", () => {
  cy.openHomePage();
  
});

it("test with page object", () => {
  navigateTo.formLayoutsPage();
  onFormsLayoutsPage.submitUsingTheGridForm2("test@test.com", "helloWorld", 0);
  onFormsLayoutsPage.submitBasicForm("Jairo Ledezma", "helloWorld2", false);
  navigateTo.datePickerPage();
  onDatePickerPage.selectCommonDatepickerDateFromToday(5);
  onDatePickerPage.selectRangePickerDateFromToday(10, 50);
});
