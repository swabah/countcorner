const app = require("./app");
const dotenv = require("dotenv");
const serverless = require("serverless-http");
const mongoose = require("mongoose");

dotenv.config();
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
  try {
    await connectToDb();
    return app(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = serverless(handler);
