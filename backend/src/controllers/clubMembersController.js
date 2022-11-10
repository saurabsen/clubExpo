const asyncHandler = require("express-async-handler");
let ObjectId = require("mongoose").Types.ObjectId;
const ClubMembers = require("../models/clubMembersModal.js");
const User = require("../models/userModel");

const getClubMembers = asyncHandler(async (req, res) => {
  const { userid, clubid } = req.body;

  if (!userid || !clubid) {
    res.status(400);
    throw new Error("Please enter all the required details");
  }

  const user_ids = userid.map((data) => new ObjectId(data));

  const clubMembersData = await ClubMembers.find({
    user_id: { $in: userid },
    club_id: clubid,
  });

  const users = await User.find({ _id: { $in: user_ids } });

  users.forEach((data, index) => {
    const statusData = clubMembersData.filter(
      (clubdata) => clubdata.user_id === data._id.toString()
    );
    users[index]["status"] = statusData[0].status;
    users[index]["request"] = statusData[0].request;
  });

  if (users) {
    res.status(201).json(users);
  } else {
    res.status(400);
    throw new Error("Club not found");
  }
});

const getIndividualMember = asyncHandler(async (req, res) => {
  const { userid, clubid } = req.params;

  if (!userid || !clubid) {
    res.status(400);
    throw new Error("Please enter all the required details");
  }

  const clubMembers = await ClubMembers.find({
    user_id: userid,
    club_id: clubid,
  });

  if (clubMembers) {
    res.status(201).json(clubMembers);
  } else {
    res.status(400);
    throw new Error("Club not found");
  }
});

const storeIndividualMember = asyncHandler(async (req, res) => {
  const { clubid, userid } = req.body;

  if (!userid || !clubid) {
    res.status(400);
    throw new Error("Please enter all the required details");
  }

  const clubMember = await ClubMembers.create({
    user_id: userid,
    club_id: clubid,
    status: false,
    request: true,
  });

  if (clubMember) {
    res.status(201).json(clubMember);
  } else {
    res.status(400);
    throw new Error("Club not found");
  }
});

module.exports = {
  getClubMembers,
  storeIndividualMember,
  getIndividualMember,
};
