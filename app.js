require("dotenv").config();
require("./startup/db.js")();
const express = require("express");
const path = require("path");
const logger = require("./startup/logger");
const errorHandler = require("./startup/errorHandler.js");
const cors = require("cors");

const app = express();
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : "*";

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        allowedOrigins === "*" ||
        !origin ||
        allowedOrigins.includes(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware to remove .html extension and serve static files
app.use((req, res, next) => {
  if (req.url.endsWith(".html")) {
    const newUrl = req.url.slice(0, -5); // Remove '.html'
    res.redirect(301, newUrl);
  } else {
    next();
  }
});

// Serve static files
app.use(
  express.static(path.join(__dirname, "public"), { extensions: ["html"] })
);

// Initialize all API routes
require("./startup/routes.js")(app);

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "404.html"));
});

// Custom error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
