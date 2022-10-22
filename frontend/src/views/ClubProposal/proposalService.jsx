import axios from 'axios';

const API_URL = '/api/proposals/';

// Create new proposals
const createProposal = async (proposalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.post(API_URL, proposalData, config);

  return response.data;
};

// Get proposals
const getProposals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const proposalService = {
  createProposal,
  getProposals
};

export default proposalService;
