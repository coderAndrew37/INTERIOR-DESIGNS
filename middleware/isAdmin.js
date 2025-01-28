const path = require("path");
const User = require("../models/user.js");

async function adminMiddleware(req, res, next) {
  try {
    // Check if the user exists in the database
    const user = await User.findById(req.user.userId);
    if (!user) {
      // Serve the unauthorized.html page if the user is not found
      return res
        .status(403)
        .sendFile(path.join(__dirname, "../public/unauthorized.html"));
    }

    // Check if the user has admin privileges
    if (!user.isAdmin) {
      // Serve the unauthorized.html page if the user is not an admin
      return res
        .status(403)
        .sendFile(path.join(__dirname, "../public/unauthorized.html"));
    }

    // User is authorized; proceed to the next middleware
    next();
  } catch (error) {
    // Handle unexpected errors by serving the unauthorized.html page
    return res
      .status(500)
      .sendFile(path.join(__dirname, "../public/unauthorized.html"));
  }
}

module.exports = adminMiddleware;
