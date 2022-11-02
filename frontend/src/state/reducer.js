import { combineReducers } from 'redux';
import eventReducer from './events/reducer';
import clubReducer from './clubs/reducer';
import proposalReducer from './proposals/reducer';
import authReducer from './auth/reducer';

const rootReducer = combineReducers({
  events: eventReducer,
  clubs: clubReducer,
  proposals: proposalReducer,
  auth: authReducer
});

export default rootReducer;
