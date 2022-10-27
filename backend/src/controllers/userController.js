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

// @desc Remove club from User
// @route POST /api/users/:userid/remove/:clubid
// @access Private
const removeClubFromUser = asyncHandler(async (req, res) => {
  const { userid, clubid } = req.params;

  // Check if user exist
  const existUser = await User.findOne({ _id: userid });

  if (!existUser) {
    res.status(400);
    throw new Error('User not found');
  }

  let clubArray = existUser.clubsJoined;
  const targetIndex = clubArray.indexOf(clubid);


  if (targetIndex === -1) {
    res.status(400);
    throw new Error('User is not part of this club');
  } else {
    clubArray.splice(targetIndex, 1)
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

// @desc Add event to User
// @route POST /api/users/:userid/attend/:eventid
// @access Private
const addEventToUser = asyncHandler(async (req, res) => {
  const { userid, eventid } = req.params;

  // Check if user exist
  const existUser = await User.findOne({ _id: userid });

  if (!existUser) {
    res.status(400);
    throw new Error('User not found');
  }

  let eventsArray = existUser.eventsAttended;
  const targetIndex = eventsArray.indexOf(eventid);


  if (targetIndex === -1) {
    eventsArray.push(eventid)
  } else {
    res.status(400);
    throw new Error('User is already part of event');
  }

  const updatedUser = await User.findByIdAndUpdate(userid, {eventsAttended: eventsArray}) 

  if (updatedUser) {
    res.status(200).json({
      id: updatedUser.id,
      eventsAttended: eventsArray
    })
  } else {
    res.status(400);
    throw new Error("Something went wrong")
  }

})

// @desc Remove event from User
// @route POST /api/users/:userid/attend/:eventid
// @access Private
const removeEventFromUser = asyncHandler(async (req, res) => {
  const { userid, eventid } = req.params;

  // Check if user exist
  const existUser = await User.findOne({ _id: userid });

  if (!existUser) {
    res.status(400);
    throw new Error('User not found');
  }

  let eventsArray = existUser.eventsAttended;
  const targetIndex = eventsArray.indexOf(eventid);

  if (targetIndex === -1) {
    res.status(400);
    throw new Error('User is not part of this event');
  } else {
    eventsArray.splice(targetIndex, 1)
  }

  const updatedUser = await User.findByIdAndUpdate(userid, {eventsAttended: eventsArray}) 

  if (updatedUser) {
    res.status(200).json({
      id: updatedUser.id,
      eventsAttended: eventsArray
    })
  } else {
    res.status(400);
    throw new Error("Something went wrong")
  }

})

// @desc Add badge to User
// @route POST /api/users/:userid/attend/:eventid
// @access Private
const addBadgeToUser = asyncHandler(async (req, res) => {
  const { userid, badgeid } = req.params;

  // Check if user exist
  const existUser = await User.findOne({ _id: userid });

  if (!existUser) {
    res.status(400);
    throw new Error('User not found');
  }

  let badgeArray = existUser.badges;
  const targetIndex = badgeArray.indexOf(badgeid);


  if (targetIndex === -1) {
    badgeArray.push(badgeid)
  } else {
    res.status(400);
    throw new Error('User already has this badge');
  }

  const updatedUser = await User.findByIdAndUpdate(userid, {badges: badgeArray}) 

  if (updatedUser) {
    res.status(200).json({
      id: updatedUser.id,
      badges: badgeArray
    })
  } else {
    res.status(400);
    throw new Error("Something went wrong")
  }

})

// @desc Remove event from User
// @route POST /api/users/:userid/attend/:eventid
// @access Private
const removeBadgeFromUser = asyncHandler(async (req, res) => {
  const { userid, badgeid } = req.params;

  // Check if user exist
  const existUser = await User.findOne({ _id: userid });

  if (!existUser) {
    res.status(400);
    throw new Error('User not found');
  }

  let badgesArray = existUser.badges;
  const targetIndex = badgesArray.indexOf(badgeid);

  if (targetIndex === -1) {
    res.status(400);
    throw new Error('User is not part of this event');
  } else {
    badgesArray.splice(targetIndex, 1)
  }

  const updatedUser = await User.findByIdAndUpdate(userid, {badges: badgesArray}) 

  if (updatedUser) {
    res.status(200).json({
      id: updatedUser.id,
      badges: badgesArray
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
  removeClubFromUser,
  addEventToUser,
  removeEventFromUser,
  addBadgeToUser,
  removeBadgeFromUser,
};
