const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from the header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decodedToken.userId).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('User not authorized.');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('User not authorized, token not found.');
  }
});

module.exports = { protect };
