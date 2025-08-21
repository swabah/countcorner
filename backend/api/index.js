const app = require("../app");
const serverless = require("serverless-http");

module.exports = (req, res) => {
  const handler = serverless(app);
  return handler(req, res);
};
