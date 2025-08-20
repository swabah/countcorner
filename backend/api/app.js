const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const ApiError = require("../src/utils/ApiError");
const { errorConverter, errorHandler } = require("../src/middleware/error");

const campaignRoutes = require("../src/routes/campaign.route");
const participantRoutes = require("../src/routes/participant.route");

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// Routes setup
app.use("/campaigns", campaignRoutes);
app.use("/participants", participantRoutes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  console.log(`Not found: ${req.originalUrl}`);
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
