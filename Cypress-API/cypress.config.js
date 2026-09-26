const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    username: "test@jairo.com",
    password: "helloworld",
    apiUrl: "https://conduit-api.bondaracademy.com/api",
  },
  e2e: {
    baseUrl: "https://conduit.bondaracademy.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  viewportWidth: 1280,
  viewportHeight: 720,
});
