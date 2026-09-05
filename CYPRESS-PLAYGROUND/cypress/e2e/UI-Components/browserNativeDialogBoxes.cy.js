
///<reference types='cypress'/>

// beforeEach() is a Cypress/Mocha hook that runs BEFORE every test in this
// test file.
// It receives two arguments:
// 1. "Page navigation"
//    - A string used as the name/description of the hook.
//    - This makes the Cypress test output easier to understand
// 2. () => { ... }
//    - A callback function.
//    - Cypress executes this function before each "it()" test
// Because this navigation is required by all three tests below, we put it
// inside beforeEach() instead of repeating it in every test.
beforeEach("Page navigation", () => {

  // cy.visit() navigates the browser to a URL.
  // It receives:
  //   "/" → the relative URL we want to visit.
  // "/" refers to the baseUrl configured in cypress.config.js.
  // For example, if baseUrl is:
  //   http://localhost:4200
  // then:
  //   cy.visit("/")
  // navigates to:
  //   http://localhost:4200/
  cy.visit("/");


  // cy.contains() searches the page for an element containing the
  // specified text.
  // It can receive:
  //   cy.contains(text)
  // OR:
  //   cy.contains(selector, text)
  // Here we are using the first form:
  //   cy.contains("Tables & Data")
  // Cypress looks for an element containing the text:
  //   "Tables & Data"
  // .click() is then chained to the result.
  // click() simulates a user clicking on the element.
  cy.contains("Tables & Data").click();


  // Again, cy.contains() searches for an element containing the
  // specified text.
  // "Smart Table" is the text Cypress is looking for.
  // .click() clicks the element that Cypress found.
  // This takes us to the Smart Table page where the delete buttons
  // used in the tests are located.
  cy.contains("Smart Table").click();
});


// ---------------------------------------------------------------------------
// TEST 1 — cy.on()
// ---------------------------------------------------------------------------

it("browser native dialog boxes cy.on()", () => {

  // cy.on() registers an event listener.
  // It receives TWO main arguments:
  //   cy.on(eventName, callback)
  // 1. eventName
  //    The name of the event we want Cypress to listen for.
  // 2. callback
  //    A function that Cypress executes when that event occurs.
  // "window:confirm" is a Cypress event that fires when the application
  // displays a browser-native confirmation dialog created with:
  //   window.confirm("some message")
  // The callback receives the confirmation message as its parameter.
  // In this example, the parameter is called "confirm".
  // NOTE:
  // The name "confirm" is just a variable name chosen by us.
  // We could call it:
  //   (message)
  //   (dialogMessage)
  //   (confirmationText)
  // and the code would still work.
  // It represents the value passed to the callback by Cypress.
  cy.on("window:confirm", (confirm) => {

    // expect() is an assertion function provided through Chai.
    // It receives the value that we want to make an assertion about.
    // Here:
    //   expect(confirm)
    // means:
    // "Take the confirmation message and make an assertion about it."
    // .to.equal() is the assertion method.
    // It receives the expected value as its argument.
    // Therefore:
    //   expect(confirm).to.equal("Are you sure you want to delete?");
    // verifies that the confirmation dialog contains exactly this text.
    expect(confirm).to.equal("Are you sure you want to delete?");
  });


  // cy.get() searches the DOM using a CSS selector.
  // ".nb-trash" is the CSS class of the delete buttons.
  // cy.get(".nb-trash")
  // returns all elements matching that selector.
  // .first() takes the FIRST element from the collection.
  // .first() does not receive any arguments.
  // .click() then clicks that first delete button.
  // Clicking the delete button causes the application to call
  // window.confirm(), which triggers the "window:confirm" event above.
  cy.get(".nb-trash").first().click();
});


// ---------------------------------------------------------------------------
// TEST 2 — cy.window() + cy.stub() — CONFIRM
// ---------------------------------------------------------------------------

it("browser native dialog boxes cy.window() click confirm", () => {

  // cy.window() gives us access to the application's window object.
  // The window object is the browser's global object for the current page.
  // It contains browser APIs and functions such as:
  //   window.alert()
  //   window.confirm()
  //   window.prompt()
  // cy.window() receives a callback through .then().
  // .then() receives the value yielded by the previous Cypress command.
  // In this case, the value is the application's window object.
  cy.window().then((win) => {

    // cy.stub() creates a test double that replaces/intercepts a real
    // function.
    // It receives TWO required arguments here:
    //   cy.stub(object, method)
    // 1. win
    //    The object containing the method we want to replace.
    // 2. "confirm"
    //    The name of the method we want to replace.
    // Therefore:
    //   cy.stub(win, "confirm")
    // temporarily replaces:
    //   window.confirm()
    // with a Sinon stub.
    // A STUB is useful in testing because it allows us to:
    //   - intercept a function call
    //   - prevent the real function from executing
    //   - control what the function returns
    //   - verify whether the function was called
    //   - verify what arguments were passed to it
    // In this case, we want to control the result of window.confirm()
    // instead of allowing the real browser dialog to appear.


    // .as() gives the stub an alias.
    // It receives one argument:
    //   .as(aliasName)
    // "dialogBox" becomes the name we can use later with:
    //   cy.get("@dialogBox")
    // The @ symbol tells Cypress that we are referring to an alias.
    // This makes it possible to access and make assertions about the
    // stub later in the test.


    // .returns() controls what the stub returns when it is called.
    // It receives one argument:
    //   .returns(value)
    // Here we provide:
    //   true
    // A real:
    //   window.confirm()
    // returns:
    //   true  → user clicked OK/Confirm
    //   false → user clicked Cancel
    // Therefore, this stub simulates the user clicking CONFIRM.
    cy.stub(win, "confirm")
      .as("dialogBox")
      .returns(true);


    // Find all elements with the ".nb-trash" class.
    // .first() selects the first delete button.
    // .click() simulates clicking that button.
    // The application's code should then call:
    //   window.confirm("Are you sure you want to delete?");
    // But because we replaced window.confirm() with our stub,
    // the real browser dialog will not appear.
    cy.get(".nb-trash").first().click();


    // cy.get() can also retrieve an alias created with .as().
    // "@dialogBox" refers to the stub we created above:
    //   .as("dialogBox")
    // We can now make assertions about that stub.
    // .should() is Cypress's primary assertion/retry mechanism.
    // It receives:
    //   .should(assertion, expectedValue)
    // Here:
    //   "be.calledWith"
    // checks that the stub was called with a particular argument.
    // The expected argument is:
    //   "Are you sure you want to delete?"
    // So this assertion verifies that the application called:
    //   window.confirm("Are you sure you want to delete?");
    // In other words:
    // "Verify that the confirm function was called with this message."
    cy.get("@dialogBox").should(
      "be.calledWith",
      "Are you sure you want to delete?",
    );
  });
});


// ---------------------------------------------------------------------------
// TEST 3 — cy.window() + cy.stub() — CANCEL
// ---------------------------------------------------------------------------

it("browser native dialog boxes cy.window() click cancel", () => {

  // cy.window() yields the application's window object.
  // .then() receives that window object as the "win" parameter.
  // "win" is simply a variable name representing window.
  cy.window().then((win) => {

    // Create a stub that replaces window.confirm().
    // cy.stub() receives:
    //   win       → the object containing the method
    //   "confirm" → the method we want to replace
    // .as("dialogBox")
    // creates an alias called "dialogBox".
    // .returns(false)
    // makes the stub return false whenever window.confirm() is called.
    // A real window.confirm() returns:
    //   true  → OK / Confirm
    //   false → Cancel
    // Therefore, this test simulates the user clicking CANCEL.
    cy.stub(win, "confirm").as("dialogBox").returns(false);


    // Find the delete buttons using the ".nb-trash" CSS selector.
    // .first() selects the first matching element.
    // .click() simulates clicking it.
    // The application should call window.confirm(), but our stub intercepts
    // that call and returns false instead of displaying the real dialog.
    cy.get(".nb-trash").first().click();


    // Retrieve the stub using its alias.
    // "@dialogBox" refers to:
    //   .as("dialogBox")
    // .should("be.calledWith", message)
    // verifies that the stub was called with the expected message.
    // This confirms that the application attempted to display:
    //   window.confirm("Are you sure you want to delete?");
    // Notice that this assertion checks the ARGUMENT passed to confirm().
    // It does NOT check whether confirm() returned true or false.
    // The return value (false) is controlled by:
    //   .returns(false)
    // If you wanted to verify the behavior after the user chooses Cancel,
    // you would need an additional assertion on the application UI,
    // such as checking that the row was NOT deleted.
    cy.get("@dialogBox").should(
      "be.calledWith",
      "Are you sure you want to delete?",
    );
  });
});
