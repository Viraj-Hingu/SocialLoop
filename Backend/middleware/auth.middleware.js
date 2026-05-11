const jwt = require("jsonwebtoken");
const identifyUser = async (req, res, next) => {
const Token = req.cookies.Token;

  if (!Token) {
    return res.status(401).json({
      message: "Access denied. No token provided",
    });
  }
  try {
    const decoded = jwt.verify(Token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      Messge: "Token expired",
    });
  }
};
module.exports = identifyUser;
