const jwt = require("jsonwebtoken");
const User = require("../models/UsersModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  )
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_KEY);
      req.userAuth =await User.findById(decode.id).select('-password')
      next()
    } catch (error) {
        console.log(error)
        res.status(401);
    throw new Error("Invalid authorization,Failed token");
    }
if (!token) {
    res.status(401);
    throw new Error("Invalid authorization,not token");
  }
});
module.exports = { protect };
