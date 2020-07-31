// plugins file
const webPackPreProcessor = require("@cypress/webpack-preprocessor");
const cypressFailedLog = require("cypress-failed-log/src/failed");

module.exports = (on, config) => {
  const options = {
    webpackOptions: require("../../webpack.config"),
    watchOptions: {},
  };
  on("file:preprocessor", webPackPreProcessor(options));
  on("task", { failed: cypressFailedLog() });
};
