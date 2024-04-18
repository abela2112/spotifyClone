const jwt = require("jsonwebtoken");
const admin = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(400).json({ message: "Access denied no token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, token) => {
    if (error) {
      return res.status(400).json({ message: "invalid token" });
    } else {
      if (!token.isAdmin) {
        return res.status(403).json({
          message: "Access denied! you don't have acces to this content",
        });
      }
      req.user = token;
      next();
    }
  });
};

module.exports = admin;
