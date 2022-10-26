const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc Register User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { 
    firstName,
    lastName, 
    phoneNumber,
    email, 
    gender,
    userRole,
    address, 
    zipcode, 
    country, 
    badges,
    clubsJoined,
    eventsAttended,
    profileImage,
    password } = req.body;

  if (!firstName || !lastName || !email || !address || !zipcode || !country || !password) {
    res.status(400);
    throw new Error('Please enter all the required details');
  }

  //check if user exist
  const existUser = await User.findOne({ email });

  if (existUser) {
    res.status(400);
    throw new Error('User alreday exists');
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    firstName,
    lastName,
    phoneNumber,
    email,
    gender,
    userRole,
    address,
    zipcode,
    country,
    organizationID: 0, // default is 0 (There is no org with id 0)
    badges,
    clubsJoined,
    eventsAttended,
    profileImage,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateJWT(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User');
  }
});

// @desc Login User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please enter all the required details');
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateJWT(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User');
  }
});

// @desc Get User
// @route GET /api/users/me
// @access Private
const getUser = asyncHandler(async (req, res) => {
  // getting user object from the authMiddleware i.e protect function
  res.status(200).json(req.user);
});

// @desc Get Matching Users
// @route POST /api/users/allusers
// @access Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find(req.body);

  // let matchingUsers = [];

  // const unwrap = ({id, profileImage}) => ({id, profileImage});
  
  // users.forEach((userObj) => {
  //   const newUserObj = unwrap(userObj);
  //   matchingUsers.push(newUserObj);
  // });

  res.status(200).json(users);
});

// @desc Add club to User
// @route POST /api/users/:userid/join/:clubid
// @access Private
const addClubToUser = asyncHandler(async (req, res) => {
  const { userid, clubid } = req.params;

  // Check if user exist
  const existUser = await User.findOne({ _id: userid });

  if (!existUser) {
    res.status(400);
    throw new Error('User not found');
  }

  let clubArray = existUser.clubsJoined

  if (clubArray.indexOf(clubid) === -1) {
    clubArray.push(clubid)
  } else {
    res.status(400);
    throw new Error('User is already part of club');
  }

  const updatedUser = await User.findByIdAndUpdate(userid, {clubsJoined: clubArray}) 

  if (updatedUser) {
    res.status(200).json({
      id: updatedUser.id,
      clubsJoined: clubArray
    })
  } else {
    res.status(400);
    throw new Error("Something went wrong")
  }

})

// @desc Delete User
// @route DELETE /api/users/me/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleteMsg = await User.deleteOne({id: id});

  res.status(200).json(deleteMsg);
});

// Generate a JWT Token
const generateJWT = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  deleteUser,
  addClubToUser,
};
