const asyncHandler = require("express-async-handler");

const Club = require("../models/clubModel");

// @desc get clubs
// @route GET /api/clubs
// @access Private
const getClubs = asyncHandler(async (req, res) => {
  const clubs = await Club.find();
  res.status(200).json(clubs);
});

// @desc set clubs
// @route POST /api/clubs
// @access Private
const setClubs = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ message: "Please sent text" });
    // throw new Error("Please add a text field");
  }

  const club = await Club.create({
    text: req.body.text,
  });
  res.status(200).json(club);
});

// @desc get clubs
// @route PUT /api/clubs/:id
// @access Private
const updateClubs = asyncHandler(async (req, res) => {
  const club = await Club.findById(req.params.id);
  if (!club) {
    res.status(400);
    throw new Error("Club not found");
  }

  const updatedClub = await Club.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedClub);
});

// @desc get clubs
// @route Delete /api/clubs/:id
// @access Private
const deleteClubs = asyncHandler(async (req, res) => {
  const club = await Club.findById(req.params.id);
  if (!club) {
    res.status(400);
    throw new Error("Club not found");
  }

  await club.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getClubs,
  setClubs,
  updateClubs,
  deleteClubs,
};
