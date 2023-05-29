const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

exports.protectedRoutes = asyncHandler(async (req, res, next) => {
  try {
    const user = req.user;
    if (user.type.toUpperCase() === "ADMIN") {
      next();
    } else {
      res.status(401).send("Not authorized, Admin only");
      throw new Error("Not authorized, Admin only");
    }
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, Admin only");
  }
});
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0]
  ) {
    try {
      token = req.headers.authorization;

      //decoded id
      const decoded = jwt.verify(token, process.env.SECRET_WEBTOKEN);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
});
