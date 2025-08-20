require("dotenv").config();
const app = require("./app");
const serverless = require("serverless-http");
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

let isConnected = false;

const connectToDb = async () => {
  if (!isConnected) {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log("Connected to MongoDB");
  }
};

module.exports.handler = serverless(async (req, res) => {
  try {
    await connectToDb();
    app(req, res);
  } catch (error) {
    console.error("Error in handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
