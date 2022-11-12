const asyncHandler = require("express-async-handler");

const Club = require("../models/clubModel");

const defaultCover =
  "data:image/png;base64,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";

const defaultLogo =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATVSURBVHgB7Z15SzMxEMZjrbd44A2K3/8j+Y+Igrd44H29L89CZJXutpvMJM9u5weFUtta95fMJJOkThwcHPxzBg09Z1BhQsgwIWSYEDJMCBkmhAwTQoYJIcOEkGFCyDAhZJgQMkwIGSaEDBNChgkhY6yEfHx8uJubG8fMWAmBjNvb20IMK2Mj5OHhobh9f3+78/Nzx8rYCLm+vv65//Ly4p6fnx0jYyEEoerz8/PXYxcXF0VvYaPzQqoSOR5HPmGj80LqRlWMCb7TQh4fH4tEXgVC1tXVlWOi00IuLy+HPgfSmBJ8Z4UMSuRVIMGz0EkhyAv39/eNns+S4DsppEnvKL+GYRjcOSGvr6+1ibwKyBgl52jTdyTggiC5InygdX99ff36+dTUVHHr9/tufn6+8n1OT09dKBC5tLRU+/7aZBUCAU9PT8VIp+l8ABcNF29ubq4QBZAHmoaqv2AYvL+/73KRRYgv9MUMN/Fa/3qIwU0iMb+9vRXvs7q66nKQNIfgAh4eHhbVVsmxP+SiZ6yvrxchLZacCT5JD8Efd3Z2VoQnDRCy0EPA4uLiz7pHKPi8qA5vbm661Kj3EIx6jo6O1GSA3d3dn/u9Xs9tbGy47e3t4n4od3d3WWbwqkIQSo6Pj6MTbR3oGT6p/30cyTkmhOVY7lUTAhnaK3MQsba2Vvvzvb29YClYyEo9g1cRgmFsimVSyBjUO8p4KaHhK3WCFxeC+UQKGeVEPspzkVNC8Ak+FeJCTk5OkrSociIfBYy+QucWKRO8qJCQol4IVYl8GAhxofkkVYIXE5JqE9qwRF4H8kho6EKCDylaNkVMSKoWtLKyEtQ7PKiBof4VAqrB2uFYRAh6R4rWAxESNabQHpYiwYsISSED7OzsOAnQS0KHwUjwqD5oISKkyXJpKEjks7OzTorl5WUXiuZOlWghKFdrj6zQmkPDTBULCwsuFCR4TH41EBGiDfJGTCIfREzYAuglGgk+Woj2hClmmDuM6elpF4rWTpVoIdrhCqV0LWKEAAz1pbeiRgt5f393WiCRo+ShhUQYlK7bUfcQrVDlickhHumzJrT7skYprccyOTnpJJA8a0IpRDORayCZ4KOFSHT7v6SSIZmQpc6a0Anxe6xSIDmPkDpMGr0NCOUMyVmr30SXAixyaQ6rQ4hu3qGlbAYka2NSRAuZmZlxbQSfWyP/xRL9iWJrQrlgbUgiVzKmlJ2LVAOHpogIiSll5wDznJxnQOoQERKzTp0D5kmnWPBvy8y6yQa7HIgJaUsvYW84osOj2CMA2qSsAoQievWYi4JtKViKN2esf+c6n1cFei3KJNrlfAlU4gvqQ0yhAaG0DTKA2hlDv4c2VaFwEOgZOCeouQwsjeqhT98ycxwNw+/FTkfGAmId6qdw/VIs9sSmOKoAMATf2tpqTZgqk+RYtP/GBfQUzRDmdziyDSqaMJH6P336cySSYiDCj+7aWHkuM5HrX696MdhCExrKEJpQ2ES1ue0iPNm+fKZ8EBPb+7G/yW/chqzyhgFcbGzZwRoGXofw19Z1mGFQfD0TRkJtGw1p0b0m1nJMCBkmhAwTQoYJIcOEkGFCyDAhZJgQMkwIGSaEDBNChgkhw4SQYULIMCFkmBAyTAgZJoQME0KGCSHDhJDxHws+GmAgnWFUAAAAAElFTkSuQmCC";

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
    logoImage: defaultLogo,
    coverImage: defaultCover,
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
  getClubs,
  getClub,
  getClubByUser,
  updateClub,
  deleteClub,
};
