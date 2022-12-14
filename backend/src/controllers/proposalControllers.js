const asyncHandler = require('express-async-handler');
const Proposal = require('../models/proposalModel');
const Club = require('../models/clubModel');

// @desc submit proposal
// @route POST /api/proposals
// @access Public
const submitProposal = asyncHandler(async (req, res) => {
  // const { id } = req.user; // authenticated user who is calling this func
  const {
    clubName,
    description,
    noOfEventsMonth,
    members,
    isManageClub,
    clubPurpose,
    clubInterest,
    clubActivities,
    createdBy,
    creatorName,
  } = req.body;

  if (!clubName || !description || !noOfEventsMonth || !members || !createdBy) {
    res.status(400);
    throw new Error('Please enter all the required details');
  }

  const proposal = await Proposal.create({
    clubName,
    description,
    noOfEventsMonth,
    createdBy,
    members,
    approvalStatus: 'Pending',
    approvalStatusReason: '',
    isManageClub,
    clubPurpose,
    clubInterest,
    clubActivities,
    creatorName,
  });

  if (proposal) {
    res.status(201).json({
      id: proposal.id,
      clubName: proposal.clubName,
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
  "statusValue" : ["statusCode1", "statusCode2", ...]
}
*/
const getMultipleProposalsByStatus = asyncHandler(async (req, res) => {
  const { statusValue } = req.body;

  const proposals = await Proposal.find({});

  let filterArray = [];

  proposals.forEach((status) => {
    if (statusValue === '') {
      if (
        status.approvalStatus === 'Pending' ||
        status.approvalStatus === 'Rejected' ||
        status.approvalStatus === 'Approved'
      ) {
        filterArray.push(status);
      }
    } else {
      if (status.approvalStatus === statusValue) {
        filterArray.push(status);
      }
    }
  });

  // const filterObject = {
  //   $or: filterArray,
  // };

  res.status(200).json(filterArray);
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

  const { clubName, description, noOfEventsMonth, createdBy, members, approvalStatus, approvalStatusReason } = req.body;

  if (!clubName || !description || !noOfEventsMonth || !createdBy || !members || !approvalStatus) {
    res.status(400);
    throw new Error('Please enter all the required details');
  }

  targetProposal.clubName = clubName;
  targetProposal.description = description;
  targetProposal.noOfEventsMonth = noOfEventsMonth;
  targetProposal.createdBy = createdBy;
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
