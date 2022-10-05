const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // fields validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please enter all the fields.');
  }

  //check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User alreday exists.');
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data.');
  }
});

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // fields validation
  if (!email || !password) {
    res.status(400);
    throw new Error('Please enter all the fields.');
  }

  //check if user exists
  const userExists = await User.findOne({ email });

  if (!userExists) {
    res.status(400);
    throw new Error('User not registered.');
  }

  // compare password and send token
  if (await bcrypt.compare(password, userExists.password)) {
    res.json({
      _id: userExists.id,
      name: userExists.name,
      email: userExists.email,
      token: generateJWT(userExists.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials.');
  }

  res.json({ message: 'login User' });
});

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  // getting user object from the authMiddleware i.e protect function
  res.status(200).json(req.user);
});

// Generate a JWT token
const generateJWT = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
