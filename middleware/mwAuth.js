const jwt = require("jsonwebtoken");
const config = require("config");
require("dotenv").config();

module.exports = function (req, res, next) {
  // Get the token(jwt) from the header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token

  try {
    // Decode the token with verify on the backend
    const decoded = jwt.verify(token, process.env.jwtSecret);

    // In the request object, put user with the info coming from the decoded user
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
