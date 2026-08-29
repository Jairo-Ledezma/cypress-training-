const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: "https://playground.bondaracademy.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
  //defaultCommandTimeout: 11000, global timeout, this will make cypress wait at least 11 seconds before failing on every command 
});
