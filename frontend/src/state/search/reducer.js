import {
  FETCH_SEARCH_BY_CLUBS,
  FETCH_SEARCH_BY_CLUBS_DATA_SUCCESS,
  FETCH_SEARCH_BY_CLUBS__DATA_ERROR,
  FETCH_SEARCH_BY_EVENTS,
  FETCH_SEARCH_BY_EVENTS_DATA_SUCCESS,
  FETCH_SEARCH_BY_EVENTS__DATA_ERROR
} from './types';

const initialState = {
  loading: false,
  error: null,
  searchBy: '',
  events: [],
  clubs: []
};

const searchReducer = (state = initialState, action) => {
  console.log(state, action, 'reducere');
  switch (action.type) {
    case FETCH_SEARCH_BY_CLUBS:
      return { loading: true, error: null, clubs: [], events: [], searchBy: action.searchBy };
    case FETCH_SEARCH_BY_CLUBS_DATA_SUCCESS:
      return {
        loading: false,
        error: null,
        clubs: action.payload,
        events: state.events,
        searchBy: action.searchBy
      };
    case FETCH_SEARCH_BY_CLUBS__DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
        clubs: [],
        events: [],
        searchBy: action.searchBy
      };
    case FETCH_SEARCH_BY_EVENTS:
      return { loading: true, error: null, events: [], clubs: [], searchBy: action.searchBy };
    case FETCH_SEARCH_BY_EVENTS_DATA_SUCCESS:
      return {
        loading: false,
        error: null,
        events: action.payload,
        clubs: state.clubs,
        searchBy: action.searchBy
      };
    case FETCH_SEARCH_BY_EVENTS__DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
        events: [],
        clubs: [],
        searchBy: action.searchBy
      };
    default:
      return state;
  }
};

export default searchReducer;
