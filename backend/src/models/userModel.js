const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please give your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please give your last name"],
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please give your email"],
      unique: true,
    },
    gender: {
      type: String,
      required: [true, "Please enter your gender"],
    },
    userRole: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Please give your address"],
    },
    zipcode: {
      type: String,
      required: [true, "Please enter your zipcode"],
    },
    country: {
      type: String,
      required: [true, "Please enter your country"],
    },
    organizationID: {
      type: String,
    },
    badges: {
      type: String,
    },
    clubsJoined: {
      type: String,
    },
    eventsAttended: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
