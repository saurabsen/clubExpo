const asyncHandler = require("express-async-handler");
const Club = require("../models/clubModel");
const Event = require("../models/eventModel");
const Proposal = require("../models/proposalModel");

// @desc get search club
// @route GET /api/search/club/:key
// @access Public
const searchClubs = asyncHandler(async (req, res) => {
  const clubs = await Club.find({
    $or: [{ name: { $regex: req.params.key, $options: "i" } }],
  });

  if (clubs) {
    res.status(200).json(clubs);
  } else {
    res.status(400);
    throw new Error("No search results.");
  }
});

// @desc get search Events
// @route GET /api/search/events/:key
// @access Public
const searchEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({
    $or: [{ name: { $regex: req.params.key, $options: "i" } }],
  });

  if (events) {
    res.status(200).json(events);
  } else {
    res.status(400);
    throw new Error("No search results.");
  }
});

// @desc get search proposals
// @route GET /api/search/proposals/:key
// @access Public
const searchProposals = asyncHandler(async (req, res) => {
  const proposals = await Proposal.find({
    $or: [{ name: { $regex: req.params.key, $options: "i" } }],
  });

  if (proposals) {
    res.status(200).json(proposals);
  } else {
    res.status(400);
    throw new Error("No search results.");
  }
});

module.exports = {
  searchClubs,
  searchEvents,
  searchProposals,
};
