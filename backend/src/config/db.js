const mongoose = require("mongoose");
const logger = require("./logger");
const config = require("./config");

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return; // Prevent multiple connects
  try {
    await mongoose.connect(config.mongoose.url).then(() => {
      logger.info("✅ Connected to MongoDB");
    });
  } catch (err) {
    logger.error("❌ MongoDB connection error:", err);
  }
};

module.exports = connectDB;
