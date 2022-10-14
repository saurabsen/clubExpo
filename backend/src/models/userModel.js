const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter your first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please enter your last name'],
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email id'],
      unique: true,
    },
    gender: {
      type: String,
    },
    userRole: {
      type: String,
    },
    address: {
      type: String,
      required: [true, 'Please enter your address'],
    },
    zipcode: {
      type: String,
      required: [true, 'Please enter your zipcode'],
    },
    country: {
      type: String,
      required: [true, 'Please enter your country name'],
    },
    organizationID: {
      type: Number,
    },
    badges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Badge',
      },
    ],
    clubsJoined: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
      },
    ],
    eventsAttended: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    profileImage: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
