const mongoose = require("mongoose");
const app = require("./app");
const config = require("./src/config/config");
const logger = require("./src/config/logger");

let server;

mongoose.connect(config.mongoose.url).then(() => {
  logger.info("✅ Connected to MongoDB");
  server = app.listen(config.port, () => {
    logger.info(`🚀 Server running on port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("❌ Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("👋 SIGTERM received");
  if (server) server.close();
});
