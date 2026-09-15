///<reference types = 'cypress' />

// Runs before each test.
// Navigates to the Datepicker page so every test starts from the same place.
beforeEach("Page navigation", () => {
  cy.visit("/");
  cy.contains("Forms").click();
  cy.contains("Datepicker").click();
});

it("handling date pickers", () => {
  // Find the date picker input and pass the element
  // into the .then() callback as "input".
  cy.get('[placeholder="Form Picker"]').then((input) => {
    // Create a JavaScript Date object containing today's date.
    let date = new Date();

    // Add 5 days to today's date.
    // setDate() changes the day of the month.
    date.setDate(date.getDate() + 5);

    // Get the day number from the new date.
    // Example: if the date is September 19, this returns 19.
    let futureDay = date.getDate();

    // Create the expected value that the date picker
    // should display after selecting the date.
    let dateToAssert = `Sep ${futureDay}, 2026`;

    // Click the date picker input to open the calendar.
    // cy.wrap() allows us to use the Cypress command chain
    // with the input element received from .then().
    cy.wrap(input).click();

    // Find the day cell containing the target day.
    //
    // .not(".bounding-month") excludes days that belong
    // to the previous or next month but are displayed
    // in the current calendar.
    //
    // .contains(futureDay) finds the desired day number.
    // .click() selects it.
    cy.get(".day-cell").not(".bounding-month").contains(futureDay).click();

    // Verify that the input now contains the expected date.
    cy.wrap(input).should("have.value", dateToAssert);
  });
});

it("handling future months in date picker", () => {
  // Find the date picker input.
  cy.get('[placeholder="Form Picker"]').then((input) => {
    // Open the date picker.
    cy.wrap(input).click();

    // Function used to navigate to the correct future month.
    //
    // "day" is a parameter.
    // It tells the function how many days into the future
    // we want to select.
    //
    // Example:
    // selectFutureMonth(1)  -> tomorrow
    // selectFutureMonth(30) -> 30 days from today
    // selectFutureMonth(50) -> 50 days from today
    function selectFutureMonth(day) {
      // Create a Date object containing today's date.
      let date = new Date();

      // Add the number of days provided through the "day" parameter.
      date.setDate(date.getDate() + day);

      // Get the day number from the future date.
      let futureDay = date.getDate();

      // Get the full month name.
      // Example: "September"
      let futureMonthLong = date.toLocaleDateString("en-US", {
        month: "long",
      });

      // Get the abbreviated month name.
      // Example: "Sep"
      //
      // This is used later to build the expected input value.
      let futureMonthShort = date.toLocaleDateString("en-US", {
        month: "short",
      });

      // Get the year from the future date.
      let futureYear = date.getFullYear();

      // Build the date format that we expect to see
      // inside the date picker input.
      //
      // Example: "Nov 3, 2026"
      let dateToAssert = `${futureMonthShort} ${futureDay}, ${futureYear}`;

      // Get the text from the calendar's month/year header.
      cy.get("nb-calendar-view-mode")
        .invoke("text")
        .then((calendarMonthAndYear) => {
          // Check whether the calendar is currently displaying
          // the target month AND target year.
          //
          // If either one doesn't match, we need to move
          // to the next month.
          if (
            !calendarMonthAndYear.includes(futureMonthLong) ||
            !calendarMonthAndYear.includes(futureYear)
          ) {
            // Click the right arrow to move the calendar
            // forward by one month.
            cy.get('[data-name="chevron-right"]').click();

            // Call the same function again.
            //
            // This is recursion. The function keeps checking
            // the calendar and moving forward one month at a time
            // until the target month and year are displayed.
            selectFutureMonth(day);
          } else {
            // The calendar is now displaying the correct
            // month and year, so select the target day.
            //
            // .not(".bounding-month") prevents us from selecting
            // a day belonging to an adjacent month.
            cy.get(".day-cell")
              .not(".bounding-month")
              .contains(futureDay)
              .click();
          }
        });

      // Return the expected date so it can be used
      // by the assertion outside the function.
      return dateToAssert;
    }

    // Call the function and tell it to find a date
    // that is 1 day in the future.
    //
    // The returned value is stored in dateToAssert.
    const dateToAssert = selectFutureMonth(100);

    // Verify that the date picker input contains
    // the expected date.
    cy.wrap(input).should("have.value", dateToAssert);
  });
});
