const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  deleteUser,
  addClubToUser,
  removeClubFromUser,
  addEventToUser,
  removeEventFromUser,
  addBadgeToUser,
  removeBadgeFromUser,
  updateUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUser);
router.put("/me/:id", updateUser);
router.delete("/me/:id", deleteUser);
router.post("/allusers", getUsers);
router.post("/:userid/join/:clubid", addClubToUser);
router.post("/:userid/remove/:clubid", removeClubFromUser);
router.post("/:userid/attend/:eventid", addEventToUser);
router.post("/:userid/unattend/:eventid", removeEventFromUser);
router.post("/:userid/award/:badgeid", addBadgeToUser);
router.post("/:userid/deaward/:badgeid", removeBadgeFromUser);

module.exports = router;
