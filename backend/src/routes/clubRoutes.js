const express = require("express");
const router = express.Router();
const {
  getClubs,
  setClubs,
  updateClubs,
  deleteClubs,
} = require("../controllers/clubControllers");

// Short form for same routes
router.route("/").get(getClubs).post(setClubs);

// Long form of routes
router.put("/:id", updateClubs);

router.delete("/:id", deleteClubs);

module.exports = router;
