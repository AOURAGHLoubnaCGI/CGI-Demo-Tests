const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'eo1v5q',
  // Configure the reporter for generating reports
  reporter: 'cypress-mochawesome-reporter',
  //projectId: "f2n1bu",
  e2e: {
    setupNodeEvents(on, config) {
      // Setup for the cypress-mochawesome-reporter
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },


});

