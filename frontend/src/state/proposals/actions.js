//import { clubs } from '../../common/api';
import axios from 'axios';
import proposal from '../../common/api';
import {
  FETCH_PROPOSALS,
  GET_FETCH_PROPOSALS_DATA_SUCCESS,
  GET_FETCH_PROPOSALS_DATA_ERROR
} from './types';

export const getAllProposalData = (queryString) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_PROPOSALS
    });

    try {
      const data = await proposal.getProposals();

      dispatch({
        type: GET_FETCH_PROPOSALS_DATA_SUCCESS,
        payload: data
      });
      return data;
    } catch (error) {
      dispatch({
        type: GET_FETCH_PROPOSALS_DATA_ERROR,
        payload: error.message
      });
    }
  };
};

export const postProposalData = () => {};
