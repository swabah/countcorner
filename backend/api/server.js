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

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  connectToDb()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running locally on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Failed to connect to DB", err);
    });
}

const handler = async (req, res) => {
  const { name = "World" } = req.query;
  return res.json({
    message: `Hello ${name}!`,
  });
};

module.exports = serverless(handler);
