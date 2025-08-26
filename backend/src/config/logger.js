const config = require("./config");

const logger = {
  error: (message) => {
    if (config.env === "development") {
      console.error("ERROR:", message);
    }
  },
  info: (message) => {
    if (config.env === "development") {
      console.log("INFO:", message);
    }
  },
  warn: (message) => {
    if (config.env === "development") {
      console.warn("WARN:", message);
    }
  },
  debug: (message) => {
    if (config.env === "development") {
      console.debug("DEBUG:", message);
    }
  },
};

module.exports = logger;
