/// <reference types="cypress" />

beforeEach("Done before each test", () => {
  cy.visit("/");
});
it("Hello World 1", () => {});

it("Hello World 2", () => {});

describe("Test suite 1", () => {
  beforeEach("done before each test only in this describe", () => {
    cy.visit("/");
  });
  it("Hello World 3", () => {});

  it("Hello World 4", () => {});
  afterEach("done after each test only in this describe", () => {
    cy.visit("/");
  });
});

it("Hello World 9", () => {});

afterEach("done after every test", () => {
  cy.visit("https://www.google.com");
});
