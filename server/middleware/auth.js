const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  const token = authorization?.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(400).json({ message: "Access denied no token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, token) => {
    if (error) {
      return res.status(400).json({ message: "invalid token" });
    } else {
      req.user = token;
      next();
    }
  });
};

module.exports = auth;
