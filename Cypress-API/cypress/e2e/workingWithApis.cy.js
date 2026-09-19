///<reference types="cypress"/>

import { onLoginPage } from "../page-Objects/loginPage";

it("first test POM", () => {
  cy.visit("/");
  onLoginPage.loginFlow();
});

it("first test custom command and intercepting API calls", () => {
  cy.intercept("GET", "https://**/tags", {
    fixture: "tags.json",
  });

  cy.intercept(
    "GET",
    "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0",
    {
      fixture: "articles.json",
    },
  );

  cy.login();
});

it.only("modifying an API response catching original then modifying it", () => {
  cy.intercept("GET", "**/articles*", (req) => {
    req.continue((res) => {
      res.body.articles[0].favoritesCount = 9999999;
      res.send(res.body);
    });
  });
  cy.login();
  cy.get("app-favorite-button").first().should("contain.text", "9999999");
});
