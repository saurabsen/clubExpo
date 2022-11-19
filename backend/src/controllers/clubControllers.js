const asyncHandler = require("express-async-handler");
let ObjectId = require("mongoose").Types.ObjectId;
const Club = require("../models/clubModel");
const coverImg = require("../assets/index");
const defLogo = require("../assets/index");

// @desc Create Club
// @route GET /api/clubs
// @access Private
const createClub = asyncHandler(async (req, res) => {
  const { name, description, createdBy, admins } = req.body;

  if (!name || !description || !createdBy || !admins) {
    res.status(400);
    throw new Error("Please enter all the required details");
  }

  //create club
  const club = await Club.create({
    name,
    logoImage: defLogo.defLogo,
    coverImage: coverImg.coverImg,
    description,
    createdBy,
    admins,
    acceptedMembers: [],
    pendingMembers: [],
    events: [],
    badges: [],
    status: "",
    tags: "",
  });

  console.log(club, "clubs");

  if (club) {
    res.status(201).json({
      id: club.id,
      name: club.name,
      description: club.description,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Club");
  }
});

// @desc Get Clubs
// @route GET /api/clubs
// @access Private
const getClubs = asyncHandler(async (req, res) => {
  const clubs = await Club.find({});
  res.status(200).json(clubs);
});

// @desc Get Club
// @route GET /api/clubs/:id
// @access Private

const getClubByMember = async (req, res) => {
  const { userid } = req.params;
  const clubByMember = await Club.find({
    acceptedMembers: { $in: userid },
  });
  res.status(200).json(clubByMember);
};

const getClub = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const club = await Club.findById({ _id: id });

  if (club) {
    res.status(201).json({
      id: club.id,
      name: club.name,
      description: club.description,
      logoImage: club.logoImage,
      coverImage: club.coverImage,
      createdBy: club.createdBy,
      admins: club.admins,
      acceptedMembers: club.acceptedMembers,
      pendingMembers: club.pendingMembers,
      events: club.events,
      badges: club.badges,
      status: club.status,
      tags: club.tags,
    });
  } else {
    res.status(400);
    throw new Error("Club not found");
  }
});

// @desc Get Club
// @route GET /api/clubs/:id
// @access Private
const getClubByUser = asyncHandler(async (req, res) => {
  const { userID } = req.params;

  const club = await Club.find({ createdBy: userID });

  if (club) {
    res.status(200).json(club);
  } else {
    res.status(400);
    throw new Error("Club not found");
  }
});

// @desc Update Club
// @route PUT /api/clubs/:id
// @access Private
const updateClub = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const club = await Club.findById({ _id: id });

  if (!club) {
    res.status(400);
    throw new Error("Club not found");
  }

  const updatedClub = await Club.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (updatedClub) {
    res.status(201).json({
      id: updatedClub.id,
      name: updatedClub.name,
      description: updatedClub.description,
    });
  } else {
    res.status(400);
    throw new Error("Club not found");
  }
});

// @desc Delete Club
// @route Delete /api/clubs/:id
// @access Private
const deleteClub = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const club = await Club.findById({ _id: id });

  if (!club) {
    res.status(400);
    throw new Error("Club not found");
  }

  await club.remove();

  res.status(200).json({ id });
});

module.exports = {
  createClub,
  getClubByMember,
  getClubs,
  getClub,
  getClubByUser,
  updateClub,
  deleteClub,
};
