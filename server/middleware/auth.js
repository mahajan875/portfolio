const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) return res.status(401).json("No token");

  const token = authHeader.split(" ")[1]; // 🔥 important

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(400).json("Invalid Token");
  }
};