import {
  FETCH_PROPOSALS_BY_STATUS,
  FETCH_PROPOSALS_BY_STATUS_DATA_SUCCESS,
  FETCH_PROPOSALS_BY_STATUS__DATA_ERROR,
  SUBMIT_PROPOSAL,
  SUBMIT_PROPOSAL_DATA_SUCCESS,
  SUBMIT_PROPOSAL_DATA_ERROR
} from './types';

const initialState = {
  loading: false,
  error: null,
  data: []
};

const proposalReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROPOSALS_BY_STATUS:
      return { loading: true, error: null, data: [] };
    case FETCH_PROPOSALS_BY_STATUS_DATA_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case FETCH_PROPOSALS_BY_STATUS__DATA_ERROR:
      return { loading: false, error: action.payload, data: [] };
    case SUBMIT_PROPOSAL:
      return { loading: true, error: null, data: [] };
    case SUBMIT_PROPOSAL_DATA_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case SUBMIT_PROPOSAL_DATA_ERROR:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default proposalReducer;
