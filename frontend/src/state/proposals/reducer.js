import {
  FETCH_PROPOSALS,
  GET_FETCH_PROPOSALS_DATA_SUCCESS,
  GET_FETCH_PROPOSALS_DATA_ERROR
} from './types';

const initialState = {
  loading: false,
  error: null,
  data: []
};

const proposalReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROPOSALS:
      return { loading: true, error: null, data: [] };
    case GET_FETCH_PROPOSALS_DATA_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case GET_FETCH_PROPOSALS_DATA_ERROR:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default proposalReducer;
