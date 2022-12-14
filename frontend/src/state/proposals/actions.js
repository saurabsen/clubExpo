import axios from 'axios';
import {
  FETCH_PROPOSALS_BY_STATUS,
  FETCH_PROPOSALS_BY_STATUS_DATA_SUCCESS,
  FETCH_PROPOSALS_BY_STATUS__DATA_ERROR,
  SUBMIT_PROPOSAL,
  SUBMIT_PROPOSAL_DATA_SUCCESS,
  SUBMIT_PROPOSAL_DATA_ERROR
} from './types';

export const getProposalByStatus = (statusValue = '') => {
  const status = {
    statusValue: statusValue
  };

  return async (dispatch) => {
    dispatch({
      type: FETCH_PROPOSALS_BY_STATUS
    });

    try {
      const token = JSON.parse(localStorage.getItem('userToken'));

      const data = await axios.post(`proposals/getProposalsByStatus`, status, {
        headers: { Authorization: `Bearer ${token}` }
      });

      dispatch({
        type: FETCH_PROPOSALS_BY_STATUS_DATA_SUCCESS,
        payload: data.data
      });
      return data;
    } catch (error) {
      dispatch({
        type: FETCH_PROPOSALS_BY_STATUS__DATA_ERROR,
        payload: error.message
      });
    }
  };
};

export const submitProposal = (propsalData) => {
  return async (dispatch) => {
    dispatch({
      type: SUBMIT_PROPOSAL
    });

    try {
      const data = await axios.post(`proposals/`, propsalData);

      dispatch({
        type: SUBMIT_PROPOSAL_DATA_SUCCESS,
        payload: data.data
      });

      return data;
    } catch (error) {
      dispatch({
        type: SUBMIT_PROPOSAL_DATA_ERROR,
        payload: error.message
      });
    }
  };
};
