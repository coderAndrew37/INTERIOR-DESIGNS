const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
require("./startup/db.js")(); // Ensure database connection
const logger = require("./startup/logger");
const errorHandler = require("./startup/errorHandler.js");
const authMiddleware = require("./middleware/auth");
const adminMiddleware = require("./middleware/isAdmin");

const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS setup
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

// Middleware to handle .html extensions
app.use((req, res, next) => {
  if (req.url.endsWith(".html")) {
    const newUrl = req.url.slice(0, -5);
    res.redirect(301, newUrl);
  } else {
    next();
  }
});

// Serve static files
app.use(
  express.static(path.join(__dirname, "public"), { extensions: ["html"] })
);

// Protected admin dashboard route
app.get("/admin/dashboard", authMiddleware, adminMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// API routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
app.use("/api/users", authRoutes);
app.use("/api/admin", authMiddleware, adminMiddleware, adminRoutes);

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// Custom error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
