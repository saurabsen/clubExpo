const asyncHandler = require('express-async-handler');

const Club = require('../models/clubModel');

// @desc Create Club
// @route GET /api/clubs
// @access Private
const createClub = asyncHandler(async (req, res) => {
  const { id } = req.user; // authenticated user who is calling this func
  const { name, logoImage, coverImage, description, admins, tags } = req.body;

  if (!name || !logoImage || !coverImage || !description || !admins || !tags) {
    res.status(400);
    throw new Error('Please enter all the required details');
  }

  //create club
  const club = await Club.create({
    name,
    logoImage,
    coverImage: '',
    description,
    createdBy: id,
    admins,
    acceptedMembers: [],
    pendingMembers: [],
    events: [],
    badges: [],
    status: '',
    tags,
  });

  if (club) {
    res.status(201).json({
      id: club.id,
      name: club.name,
      description: club.description,
    });
  } else {
    res.status(400);
    throw new Error('Invalid Club');
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
const getClub = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const club = await Club.findById({ _id: id });

  if (club) {
    res.status(201).json({
      id: club.id,
      name: club.name,
      description: club.description,
    });
  } else {
    res.status(400);
    throw new Error('Club not found');
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
    throw new Error('Club not found');
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
    throw new Error('Club not found');
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
    throw new Error('Club not found');
  }

  await club.remove();

  res.status(200).json({ id });
});

module.exports = {
  createClub,
  getClubs,
  getClub,
  updateClub,
  deleteClub,
};
