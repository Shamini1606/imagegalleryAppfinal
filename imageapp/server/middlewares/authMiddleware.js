// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }

  // Check if the token starts with "Bearer "
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length); // Remove "Bearer " from the token
  } else {
    return res.status(401).json({ message: "Invalid token format" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Check for specific error types
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      }
      return res.status(401).json({ message: "Invalid Token" });
    }
    req.user = decoded; // Attach the decoded user information to the request
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = { verifyToken }; // Correctly export the verifyToken function
