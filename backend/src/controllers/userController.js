const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, university, password } = req.body;
  if (!name || !email || !university || !password) {
    res.status(400);
    throw new Error("Please enter all the required details");
  }

  //check if user exist
  const existUser = await User.findOne({ email });

  if (existUser) {
    res.status(400);
    throw new Error("User alreday exist");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    university,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User");
  }
});

// @desc register user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User");
  }
});

// @desc register user
// @route GET /api/users/me
// @access Public
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "User Details" });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
