const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const {
  submitProposal,
  getProposal,
  getProposalsByStatus,
  updateProposal,
  deleteProposal } = require("../controllers/proposalControllers")

  router.post("/getproposals", protect, getProposalsByStatus);
  router.get("/:proposalId", protect, getProposal);
  router.put("/:proposalId", protect, updateProposal);
  router.delete("/:proposalId", protect, deleteProposal);
  router.post("/", protect, submitProposal);

module.exports = router;