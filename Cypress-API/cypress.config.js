const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    username: "test@jairo.com",
    password: "helloworld",
    apiUrl: "https://conduit-api.bondaracademy.com/api",
  },

  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "reporter-config.json",
  },
  e2e: {
    baseUrl: "https://conduit.bondaracademy.com",
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    retries: {
      openMode: 0, // with cypres ui open retries a failed test
      runMode: 1, // with cypress ui closed retries a failed test
    },
  },

  viewportWidth: 1280,
  viewportHeight: 720,
});
