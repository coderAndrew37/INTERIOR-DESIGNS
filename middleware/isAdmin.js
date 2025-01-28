const path = require("path");
const User = require("../models/user.js");

async function adminMiddleware(req, res, next) {
  try {
    const user = await User.findById(req.user.userId); // Fix user ID reference
    if (!user) {
      return res
        .status(403)
        .json({ message: "Access denied. User not found." });
    }

    if (!user.isAdmin) {
      return res
        .status(403)
        .sendFile(path.join(__dirname, "../public/unauthorized.html"));
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = adminMiddleware;
