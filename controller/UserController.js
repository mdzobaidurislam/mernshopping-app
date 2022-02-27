const User = require("../models/UsersModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utlis/generateToken");
const { send } = require("express/lib/response");

class UserController {
  // User registration
  static registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.status(400);
      throw new Error("User Already Exists");
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      res.status(201);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found!");
    }
  });

  // User login
  static LoginUserDocuments = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });
  // User profile
  static getUserprofile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.userAuth._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);

      throw new Error("User not found!");
    }
  });

  // update user profile
  static updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.userAuth._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updateUser = await user.save();
      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        phone: updateUser.phone,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser._id),
      });
    }else{
      res.status(404);
      throw new Error("User not found!");
    }
  });

  
  // Admin check route
  static getAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.userAuth._id);
    if (user.isAdmin) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401)

      throw new Error("User not found!");
    }
  });

}

module.exports = UserController;
