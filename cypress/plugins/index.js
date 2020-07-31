// plugins file
const webPackPreProcessor = require("@cypress/webpack-preprocessor");

module.exports = (on, config) => {
  const options = {
    webpackOptions: require("../../webpack.config"),
    watchOptions: {},
  };
  on("file:preprocessor", webPackPreProcessor(options));
};
