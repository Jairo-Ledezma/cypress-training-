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

it("modifying an API response catching original then modifying it", () => {
  cy.intercept("GET", "**/articles*", (req) => {
    req.continue((res) => {
      res.body.articles[0].favoritesCount = 9999999;
      res.send(res.body);
    });
  });
  cy.login();
  cy.get("app-favorite-button").first().should("contain.text", "9999999");
});

it("route matcher", () => {
  cy.intercept(
    { method: "GET", pathname: "tags" },
    {
      fixture: "tags.json",
    },
  );

  cy.intercept(
    { method: "GET", pathname: "articles" },
    {
      fixture: "articles.json",
    },
  );

  cy.login();
});

it.only("waiting for browser API calls", () => {
  cy.intercept({ method: "GET", pathname: "articles" }).as("articleApiCall");
  cy.login();
  cy.wait("@articleApiCall").then((apiArticleObject) => {
    console.log(apiArticleObject);
    expect(apiArticleObject.response.body.articles[0].title).to.contain(
      "Bondar Academy",
    );
  });
  cy.get("app-article-list")
    .invoke("text")
    .then((allArticleTexts) => {
      expect(allArticleTexts).to.contain("Bondar Academy");
    });
});
