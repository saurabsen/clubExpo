import { combineReducers } from 'redux';
import eventReducer from './events/reducer';
import clubReducer from './clubs/reducer';
import proposalReducer from './proposals/reducer';
import authReducer from './auth/reducer';
import searchReducer from './search/reducer';

const rootReducer = combineReducers({
  events: eventReducer,
  clubs: clubReducer,
  proposals: proposalReducer,
  auth: authReducer,
  search: searchReducer
});

export default rootReducer;
