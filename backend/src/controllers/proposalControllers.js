const asyncHandler = require('express-async-handler');
const Proposal = require('../models/proposalModel');
const Club = require('../models/clubModel');

// @desc submit proposal
// @route POST /api/proposals
// @access Public
const submitProposal = asyncHandler(async (req, res) => {
  const { id } = req.user; // authenticated user who is calling this func
  const { clubName, description, noOfEventsMonth, members } = req.body;

  if (!clubName || !description || !noOfEventsMonth || !members) {
    res.status(400);
    throw new Error('Please enter all the required details');
  }

  const proposal = await Proposal.create({
    clubName,
    description,
    noOfEventsMonth,
    createdBy: id,
    members,
    approvalStatus: '',
    approvalStatusReason: '',
  });

  if (proposal) {
    res.status(201).json({
      id: proposal.id,
      clubName: proposal.clubName,
      createdBy: proposal.createdBy,
    });
  } else {
    res.status(400);
    throw new Error('Invalid Proposal');
  }
});

// @desc Get one proposal using id
// @route GET /api/proposals/:proposalId
// @access Public
const getOneProposal = asyncHandler(async (req, res) => {
  const { proposalId } = req.params;

  const targetProposal = await Proposal.findOne({ _id: proposalId });

  if (!targetProposal) {
    res.status(404);
    throw new Error('Proposal not found.');
  }

  res.status(200).json(targetProposal);
});

// @desc Get multiple proposals by approval status
// @route POST /api/proposals/getmultiple
// @access Public
/*
Body should be structured as follows:
{
  "statusArray" : ["statusCode1", "statusCode2", ...]
}
*/
const getMultipleProposalsByStatus = asyncHandler(async (req, res) => {
  const { statusArray } = req.body;

  let filterArray = [];

  statusArray.forEach((status) => {
    filterArray.push({ approvalStatus: status });
  });

  const filterObject = {
    $or: filterArray,
  };

  const proposals = await Proposal.find(filterObject);

  res.status(200).json(proposals);
});

// @desc Update one proposal
// @route PUT /api/proposals/:proposalId
// @access Public
const updateProposal = asyncHandler(async (req, res) => {
  const { proposalId } = req.params;

  let targetProposal = await Proposal.findOne({ _id: proposalId });

  if (!targetProposal) {
    res.status(404);
    throw new Error('Proposal not found');
  }

  const { clubName, description, noOfEventsMonth, requestedBy, members, approvalStatus, approvalStatusReason } =
    req.body;

  if (!clubName || !description || !noOfEventsMonth || !requestedBy || !members || !approvalStatus) {
    res.status(400);
    throw new Error('Please enter all the required details');
  }

  targetProposal.clubName = clubName;
  targetProposal.description = description;
  targetProposal.noOfEventsMonth = noOfEventsMonth;
  targetProposal.requestedBy = requestedBy;
  targetProposal.members = members;
  targetProposal.approvalStatus = approvalStatus;
  targetProposal.approvalStatusReason = approvalStatusReason;

  await targetProposal.save();

  res.status(200).json({ message: `Proposal with ID ${proposalId} updated.` });
});

// @desc Delete a proposal
// @route DELETE /api/proposals/:proposalId
// @access Public
const deleteProposal = asyncHandler(async (req, res) => {
  const { proposalId } = req.params;

  const targetProposal = await Proposal.findOne({ _id: proposalId });

  if (!targetProposal) {
    res.status(404).json({ message: 'Proposal not found' });
  }

  await Proposal.deleteOne({ _id: proposalId }).then((err) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ message: 'Successfully deleted' });
  });
});

module.exports = {
  submitProposal,
  getOneProposal,
  getMultipleProposalsByStatus,
  updateProposal,
  deleteProposal,
};
