const asyncHandler = require('express-async-handler');
let ObjectId = require('mongoose').Types.ObjectId;
const ClubMembers = require('../models/clubMembersModal.js');
const User = require('../models/userModel');
const Club = require('../models/clubModel');

const getClubMembers = asyncHandler(async (req, res) => {
  const { userid } = req.body;

  if (!userid) {
    res.status(400);
    throw new Error('Please enter all the required details');
  }

  const users = await User.find({ _id: { $in: userid } });

  console.log(users);

  if (users) {
    res.status(201).json(users);
  } else {
    res.status(400);
    throw new Error('Club not found');
  }
});

const getIndividualMember = asyncHandler(async (req, res) => {
  const { userid, clubid } = req.params;

  if (!userid || !clubid) {
    res.status(400);
    throw new Error('Please enter all the required details');
  }

  const clubMembers = await ClubMembers.find({
    user_id: userid,
    club_id: clubid,
  });

  if (clubMembers) {
    res.status(201).json(clubMembers);
  } else {
    res.status(400);
    throw new Error('Club not found');
  }
});

const storeIndividualMember = asyncHandler(async (req, res) => {
  const { clubid, userid } = req.body;

  if (!userid || !clubid) {
    res.status(400);
    throw new Error('Please enter all the required details');
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
    throw new Error('Club not found');
  }
});

const deleteClubMember = asyncHandler(async (req, res) => {
  const { clubid, userid } = req.params;

  if (!userid || !clubid) {
    res.status(400);
    throw new Error('Please enter all the required details');
  }

  const clubMemberDeletion = await ClubMembers.deleteOne({
    user_id: userid,
    club_id: clubid,
  });

  const clubMemberArrayDeletion = await Club.updateOne(
    { _id: clubid },
    { $pull: { acceptedMembers: userid } }
  );

  if (clubMemberDeletion && clubMemberArrayDeletion) {
    res.status(201).json('Deleted Successfully');
  } else {
    res.status(400);
    throw new Error('Club not found');
  }
});

module.exports = {
  getClubMembers,
  storeIndividualMember,
  getIndividualMember,
  deleteClubMember,
};
