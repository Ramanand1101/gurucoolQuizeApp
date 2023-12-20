const jwt = require("jsonwebtoken");
const { User } = require("../model/userModel");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Invalid or missing token" });
    }
    const decodedToken = jwt.verify(token, process.env.secretkey);
    console.log("Decoded Token:", decodedToken);

    const user = await User.findOne({ _id: decodedToken.userId });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid Token or User not found!" });
    }

    if (user && user._id == decodedToken.userId) {
      req.user = user;
      next();
    }
  } catch (e) {
    console.error("Authentication error:", e.message);
    if (e.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token signature" });
    } else if (e.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }
};

module.exports = { authMiddleware, limiter };
