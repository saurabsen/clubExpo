const asyncHandler = require('express-async-handler');
let ObjectId = require('mongoose').Types.ObjectId;
const ClubMembers = require('../models/clubMembersModal.js');
const User = require('../models/userModel');
const Club = require('../models/clubModel');

const getClubMembers = asyncHandler(async (req, res) => {
  const { clubid } = req.body;

  if (!clubid) {
    res.status(400);
    throw new Error('Please enter all the required details');
  }

  const clubMembers = await ClubMembers.find({ club_id: clubid });

  const userids = [];

  clubMembers.forEach((data) => {
    userids.push(data.user_id);
  });

  const users = await User.find({ _id: { $in: userids } }).lean();

  clubMembers.forEach((data) => {
    let index = users.findIndex((userData) =>
      userData._id.equals(data.user_id)
    );
    users[index].status = data.status;
    users[index].request = data.request;
  });

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

const addClubMember = asyncHandler(async (req, res) => {
  const { clubid, userid } = req.body;
  console.log(req.params);

  if (!userid || !clubid) {
    res.status(400);
    throw new Error('Please enter all the required details');
  }

  const clubMemberAddition = await ClubMembers.findOneAndUpdate(
    { user_id: userid, club_id: clubid },
    { $set: { status: true, request: false } },
    { new: true }
  );

  const clubMemberArrayDeletion = await Club.findOneAndUpdate(
    { _id: clubid },
    { $push: { acceptedMembers: ObjectId(userid) } },
    { new: true }
  );

  const clubJoinedArrayDeletion = await User.findOneAndUpdate(
    { _id: userid },
    { $push: { clubsJoined: ObjectId(clubid) } },
    { new: true }
  );

  if (
    clubMemberAddition &&
    clubMemberArrayDeletion &&
    clubJoinedArrayDeletion
  ) {
    res.status(201).json('Deleted Successfully');
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

  const clubMemberArrayDeletion = await Club.findOneAndUpdate(
    { _id: clubid },
    { $pull: { acceptedMembers: ObjectId(userid) } },
    { new: true }
  );

  const clubJoinedArrayDeletion = await User.findOneAndUpdate(
    { _id: userid },
    { $pull: { clubsJoined: ObjectId(clubid) } },
    { new: true }
  );

  if (true) {
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
  addClubMember,
  deleteClubMember,
};
