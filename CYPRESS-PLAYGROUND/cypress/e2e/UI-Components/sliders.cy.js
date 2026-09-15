///<reference types = "cypress"/>

// Runs before each test.
// Opens the application using the baseUrl configured in cypress.config.js.
beforeEach("page navigation", () => {
  cy.visit("/");
});

it("sliders", () => {
  // Find the <circle> element inside the Temperature slider.
  //
  // [tabtitle="Temperature"]
  //     Selects the element that has a "tabtitle" attribute
  //     with the value "Temperature".
  //
  // circle
  //     Selects the <circle> element inside that container.
  //
  // The circle represents the draggable handle/knob of the slider.
  cy.get('[tabtitle="Temperature"] circle')

    // .invoke() allows us to call a jQuery method on the element.
    //
    // "attr" gets or sets an HTML/SVG attribute.
    //
    // Here, we are changing the "cx" attribute of the SVG circle.
    // "cx" represents the horizontal (X) position of the circle.
    .invoke("attr", "cx", "52.19")

    // Change the "cy" attribute of the SVG circle.
    //
    // "cy" represents the vertical (Y) position of the circle.
    //
    // Changing cx and cy moves the slider handle to a specific
    // position on the SVG.
    .invoke("attr", "cy", "42.64")

    // Click the circle after moving it to the desired position.
    .click();

  // Find the element displaying the current temperature value.
  //
  // [class="value temperature h1"]
  //     Selects the element whose class attribute exactly matches
  //     "value temperature h1".
  //
  // .should("contain.text", "18")
  //     Verifies that the element contains the text "18".
  //
  // This confirms that moving the slider resulted in the expected
  // temperature value.
  cy.get('[class="value temperature h1"]').should("contain.text", "18");
});
