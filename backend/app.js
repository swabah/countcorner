const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const config = require("./src/config/config");
const { errorHandler } = require("./src/middleware/error");
const apiRoutes = require("./src/routes/index");
const { Limiter } = require("./src/middleware/rateLimiter");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/", apiRoutes);

app.get("/", (req, res) => {
  res.json({ message: "🦄🌈✨ API Running ✨🌈🦄" });
});

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/v1/auth", Limiter);
}

app.use(errorHandler);

module.exports = app;
