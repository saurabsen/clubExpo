//import { clubs } from '../../common/api';
import axios from 'axios';
import proposal from '../../common/api';
import {
  FETCH_PROPOSALS,
  GET_FETCH_PROPOSALS_DATA_SUCCESS,
  GET_FETCH_PROPOSALS_DATA_ERROR
} from './types';

export const getAllProposalData = (queryString) => {
  const tokenStr =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzUwMmRiMzRhMjcwYmY0ZDFhMjc5MWIiLCJpYXQiOjE2NjYxOTg5NjMsImV4cCI6MTY2ODc5MDk2M30.lPOmtB9fdmlIhDIj_R4yAvnt04ZWmuReNPNESVAak_8';

  const status = {
    statusArray: 'Pending'
  };

  return async (dispatch) => {
    dispatch({
      type: FETCH_PROPOSALS
    });

    try {
      const data = await axios.post(`http://localhost:3001/api/proposals/${queryString}`, status, {
        headers: { Authorization: `Bearer ${tokenStr}` }
      });

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
