const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";

function authMiddleware(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized. Please log in.",
      redirect: "/login.html",
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = { userId: decoded.userId }; // Proper assignment for middleware usage
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired. Please log in again.",
        redirect: "/login.html",
      });
    }
    res.status(403).json({ message: "Invalid token. Access denied." });
  }
}

module.exports = authMiddleware;
