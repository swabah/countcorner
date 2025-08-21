const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const { errorHandler } = require("./src/middleware/error");
const apiRoutes = require("./src/routes/index");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/", apiRoutes);

app.get("/sample", (req, res) => {
  res.json({ message: "🦄🌈✨ API Running ✨🌈🦄" });
});

app.use(errorHandler);

module.exports = app;
