beforeEach("Page navigation", () => {
  cy.visit("/");
  cy.contains("Forms").click();
  cy.contains("Form Layouts").click();
});

it("Input Fields", () => {
  cy.get("#inputEmail1").type("test@testing.com"); //writes all 
  cy.get("#inputEmail1").wait(3000) // timeout to see the test was added to the field
  cy.get("#inputEmail1").clear() // text cleared
  cy.get("#inputEmail1").type("test.@testing.com", {delay: 200}); // text gets slowly added due to the delay

});

it('targeting an input field by label' , ()=>{
  //cypress will understand that you want to type in the input field and not the label element 
  //this points to the label element by cypress types in the input field 
// clear will not work since we cant clear a label
// no spaces were added when typed because the field its an email field and no spaces are allowed on it so it automatically trims them 
const name= 'jairo'
  cy.contains('nb-card' , 'Using the Grid').contains('Email').type(`yes it works ${name}`)

  //sometimes a value is populated already when the page loads, so you need to clear the value before typing 
  //in those scenarios its best to assert the element is there and then clear and type 
  cy.get('#inputEmail1').should('have.value',`yesitworks${name}`).clear().type('test')

  //if you dont know the text that will be loaded you can do an assertion like this 
 cy.get('#inputEmail1').should('not.have.value','').clear().type('test2')
})

it.only('typing a key stroke instead of a click' , ()=>{
  cy.contains('Auth').click()
  cy.contains('Login').click()
  cy.get('#input-email').type('jairo@test.com')
  //cy.get('#input-password').type('test').type('{enter}')  
  cy.get('#input-password').type('test {enter}')

  // multiple key strokes are suported but the TAB key stroke is not supported that way, to do a tab you need to do the following
  cy.get('.nb-lightbulb').click().press(Cypress.Keyboard.Keys.TAB)


})