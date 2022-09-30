const { asyncHandler } = require("express-async-handler");

// @desc get clubs
// @route GET /api/clubs
// @access Private
const getClubs = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get Club" });
});

// @desc set clubs
// @route POST /api/clubs
// @access Private
const setClubs = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ message: "Please sent text" });
    // throw new Error("Please add a text field");
  }
  res.status(200).json({ message: "Set Club" });
});

// @desc get clubs
// @route PUT /api/clubs/:id
// @access Private
const updateClubs = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `update Club ${req.params.id}` });
});

// @desc get clubs
// @route Delete /api/clubs/:id
// @access Private
const deleteClubs = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete Club ${req.params.id}` });
});

module.exports = {
  getClubs,
  setClubs,
  updateClubs,
  deleteClubs,
};
