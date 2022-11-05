const express = require("express");
const router = express.Router();
const {
  searchClubs,
  searchEvents,
  searchProposals,
} = require("../controllers/searchControllers");
const { protect } = require("../middleware/authMiddleware");

router.get("/clubs/:key", searchClubs);
router.get("/events/:key", searchEvents);
router.get("/searchProposals/:key", searchProposals);

module.exports = router;
