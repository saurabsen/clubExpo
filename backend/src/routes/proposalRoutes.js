const express = require("express");
const router = express.Router();
const {
  submitProposal,
  getOneProposal,
  getMultipleProposalsByStatus,
  updateProposal,
  deleteProposal } = require("../controllers/proposalControllers")

  router.post("/getmultiple", getMultipleProposalsByStatus);
  router.get("/:proposalId", getOneProposal);
  router.put("/:proposalId", updateProposal);
  router.delete("/:proposalId", deleteProposal);
  router.post("/", submitProposal);

module.exports = router;