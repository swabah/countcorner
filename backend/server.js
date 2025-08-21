const app = require("./app");
const config = require("./src/config/config");
const connectDB = require("./src/config/db");
const logger = require("./src/config/logger");

const startServer = async () => {
  try {
    await connectDB();
    app.listen(config.port, () => {
      logger.info(`🚀 Server running at http://localhost:${config.port}`);
    });
  } catch (err) {
    logger.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();

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
