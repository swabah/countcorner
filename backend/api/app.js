const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const ApiError = require('../src/utils/ApiError');
const { errorConverter, errorHandler } = require("../src/middleware/error");

const campaignRoutes = require("../src/routes/campaign.route");
const participantRoutes = require("../src/routes/participant.route");

const app = express();

// Security headers
app.use(helmet());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data sanitization against XSS and injection attacks
app.use(xss());
app.use(mongoSanitize());

// Response compression
app.use(compression());

// Enable CORS with preflight support
app.use(cors());
app.options("*", cors());

// Routes
app.use("/campaigns", campaignRoutes);
app.use("/participants", participantRoutes);

// 404 handler for unmatched routes
app.use((req, res, next) => {
  console.log(`Not found: ${req.originalUrl}`);
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
