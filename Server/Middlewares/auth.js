const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.query.token ||
    req.headers["x-access-token"] ||
    req.params.token ||
    req.session.token;
  console.log("auth : ", token, "req : ", req.headers["x-access-token"]);
  if (!token) {
    return res.status(404).json({ success: false, message: "Token not found" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: "Please login again", error: err });
    }
  }
  return next();
};

module.exports = verifyToken;
