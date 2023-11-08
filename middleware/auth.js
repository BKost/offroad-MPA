const jwt = require("jsonwebtoken");

const authorize = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(400)
      .json({ message: "Unauthorized to access this route" });
  }

  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
  const { _id, user_name } = verifiedToken;

  if (!verifiedToken) {
    return res
      .status(400)
      .json({ message: "Unauthorized to access this route" });
  }

  req.authorizedUser = { _id, user_name };

  next();
};

module.exports = authorize;
