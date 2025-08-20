const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const { notFound, errorHandler } = require("./src/middleware/error");

const api = require("./api/index");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/", api);

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
