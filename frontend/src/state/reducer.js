import { combineReducers } from 'redux';
import eventReducer from './events/reducer';
import clubReducer from './clubs/reducer';
import proposalReducer from './proposals/reducer';
import clubMemberReducer from './clubsMembers/reducer';
import authReducer from './auth/reducer';

const rootReducer = combineReducers({
  events: eventReducer,
  clubs: clubReducer,
  proposals: proposalReducer,
  auth: authReducer,
  clubMember: clubMemberReducer
});

export default rootReducer;
