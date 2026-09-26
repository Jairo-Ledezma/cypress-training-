///<reference types="cypress"/>
import { faker } from "@faker-js/faker";

it.only("API article creation and UI to delete it", () => {
  const articleTitle = faker.person.fullName();
  cy.request({
    url: "https://conduit-api.bondaracademy.com/api/users/login",
    method: "POST",
    body: {
      user: {
        email: "test@jairo.com",
        password: "helloworld",
      },
    },
  }).then((res) => {
    expect(res.status).to.equal(200);
    const accessToken = "Token " + res.body.user.token;

    cy.request({
      url: "https://conduit-api.bondaracademy.com/api/articles/",
      method: "POST",
      body: {
        article: {
          title: articleTitle,
          description: faker.person.jobTitle(),
          body: faker.lorem.paragraph(10),
          tagList: [],
        },
      },
      headers: { Authorization: accessToken },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.article.title).to.equal(articleTitle);
    });
  });

  cy.login();
  cy.contains(articleTitle).click();
  cy.intercept("GET", "**/articles*").as("articleApiCall");
  cy.contains("button", "Delete Article").first().click();
  cy.wait("@articleApiCall");
  cy.get("app-article-list").should("not.contain.text", articleTitle);
});

it("whole flow with API", () => {
  cy.request({
    url: "https://conduit-api.bondaracademy.com/api/users/login",
    method: "POST",
    body: {
      user: {
        email: "test@jairo.com",
        password: "helloworld",
      },
    },
  }).then((res) => {
    expect(res.status).to.equal(200);
    const accessToken = "Token " + res.body.user.token;

    cy.request({
      url: "https://conduit-api.bondaracademy.com/api/articles/",
      method: "POST",
      body: {
        article: {
          title: "whole API flow",
          description: "some description",
          body: "this is a body",
          tagList: [],
        },
      },
      headers: { Authorization: accessToken },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.article.title).to.equal("whole API flow");
    });
    cy.request({
      url: "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0",
      method: "GET",
      headers: { Authorization: accessToken },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.articles[0].title).to.equal("whole API flow");
      const slugID = response.body.articles[0].slug;

      cy.request({
        url: "https://conduit-api.bondaracademy.com/api/articles/" + slugID,
        method: "DELETE",
        headers: { Authorization: accessToken },
      }).then((response) => {
        expect(response.status).to.equal(204);
      });
    });
    cy.request({
      url: "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0",
      method: "GET",
      headers: { Authorization: accessToken },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.articles[0].title).to.not.equal("whole API flow");
    });
  });
});
