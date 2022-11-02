const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  submitProposal,
  getOneProposal,
  getMultipleProposalsByStatus,
  updateProposal,
  deleteProposal,
} = require("../controllers/proposalControllers");

router.post("/getproposals", getMultipleProposalsByStatus);
router.get("/:proposalId", protect, getOneProposal);
router.put("/:proposalId", protect, updateProposal);
router.delete("/:proposalId", protect, deleteProposal);
router.post("/", protect, submitProposal);

module.exports = router;
