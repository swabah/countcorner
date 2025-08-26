const mongoose = require("mongoose");
const app = require("./app");
const config = require("./src/config/config");
const logger = require("./src/config/logger");

let server;

const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(config.mongoose.url);
    console.log("✅ Connected to MongoDB");

    server = app.listen(config.port, () => {
      console.log(`✅ Listening to port http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

startServer();

const gracefulShutdown = () => {
  if (server) {
    server.close(() => {
      logger.info("❌ Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

process.on("SIGTERM", () => {
  logger.info("👋 SIGTERM received");
  gracefulShutdown();
});
process.on("SIGINT", () => {
  logger.info("👋 SIGINT received");
  gracefulShutdown();
});

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  gracefulShutdown();
});
process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection at Promise:", reason);
  gracefulShutdown();
});
