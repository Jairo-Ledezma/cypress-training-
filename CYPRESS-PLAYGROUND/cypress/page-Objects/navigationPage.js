function selectGroupMenuItem(groupItemName) {
  cy.contains("a", groupItemName)
    .invoke("attr", "aria-expanded")
    .then((attr) => {
      if (attr.includes("false")) {
        cy.contains("a", groupItemName).click();
      }
    });
}

class NavigationPage {
  formLayoutsPage() {
    selectGroupMenuItem("Forms");
    cy.contains("Form Layouts").click();
  }

  datePickerPage() {
    selectGroupMenuItem("Forms");
    cy.contains("Datepicker").click();
  }

  dialogPage() {
    selectGroupMenuItem("Modal & Overlays");
    cy.contains("Dialog").click();
  }

  windowPage() {
    selectGroupMenuItem("Modal & Overlays");
    cy.contains("Window").click();
  }

  popOverPage() {
    selectGroupMenuItem("Modal & Overlays");
    cy.contains("Popover").click();
  }

  toastrPage() {
    selectGroupMenuItem("Modal & Overlays");
    cy.contains("Toastr").click();
  }

  tooltipPage() {
    selectGroupMenuItem("Modal & Overlays");
    cy.contains("Tooltip").click();
  }

  calendarPage() {
    selectGroupMenuItem("Extra Components");
    cy.contains("Calendar").click();
  }

  dragAndDropPage() {
    selectGroupMenuItem("Extra Components");
    cy.contains("Drag & Drop").click();
  }

  pdfDownloadPage() {
    selectGroupMenuItem("Extra Components");
    cy.contains("PDF Download").click();
  }

  echartsPage() {
    selectGroupMenuItem("Charts");
    cy.contains("Echarts").click();
  }

  tablesAndData() {
    selectGroupMenuItem("Tables & Data");
    cy.contains("Smart Table").click();
  }

  treeGridPage() {
    selectGroupMenuItem("Tables & Data");
    cy.contains("Tree Grid").click();
  }

  loginPage() {
    selectGroupMenuItem("Auth");
    cy.contains("Login").click();
    cy.get('[data-name="arrow-back"]').click();
  }

  registerPage() {
    selectGroupMenuItem("Auth");
    cy.contains("Register").click();
    cy.get('[data-name="arrow-back"]').click();
  }

  requestPasswordPage() {
    selectGroupMenuItem("Auth");
    cy.contains("Request Password").click();
    cy.get('[data-name="arrow-back"]').click();
  }

  resetPasswordPage() {
    selectGroupMenuItem("Auth");
    cy.contains("Reset Password").click();
    cy.get('[data-name="arrow-back"]').click();
  }
}

export const navigateTo = new NavigationPage();
