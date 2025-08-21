const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const { errorHandler } = require("./src/middleware/error");
const apiRoutes = require("./src/routes");
const connectDB = require("./src/config/db");

const app = express();

connectDB();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/", apiRoutes);

app.get("/", (req, res) => {
  res.json({ message: "🦄🌈✨ API Running ✨🌈🦄" });
});

app.get("/sample", (req, res) => {
  res.json({ message: "🦄🌈✨ API Sample ✨🌈🦄" });
});

app.use(errorHandler);

module.exports = app;
