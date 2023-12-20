const asyncHandler = require("express-async-handler");
const User = require("../Models/User_model");
const jwt = require("jsonwebtoken");
const privatekey = process.env.PRIVATE_KEY;
/*********************protector*************************/

exports.Protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "failed to access to token" });
    }
  }
  const decoded = jwt.verify(token, privatekey);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(400).json({ message: "can't found user" });
  }
  req.user = currentUser;
  next();
});
/*********************verify user*************************/
exports.isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    // User is an admin, proceed to the next middleware or route handler
    next();
  } else {
    // User is not an admin, return unauthorized response
    return res.status(403).json({
      message: "Permission denied. Only admins can perform this action.",
    });
  }
});
