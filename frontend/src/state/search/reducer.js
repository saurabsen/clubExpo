import {
  FETCH_SEARCH_BY_CLUBS,
  FETCH_SEARCH_BY_CLUBS_DATA_SUCCESS,
  FETCH_SEARCH_BY_CLUBS__DATA_ERROR
} from './types';

const initialState = {
  loading: false,
  error: null,
  data: []
};

const proposalReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SEARCH_BY_CLUBS:
      return { loading: true, error: null, data: [] };
    case FETCH_SEARCH_BY_CLUBS_DATA_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case FETCH_SEARCH_BY_CLUBS__DATA_ERROR:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default proposalReducer;
