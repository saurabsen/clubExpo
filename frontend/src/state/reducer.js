import { combineReducers } from 'redux';
import eventReducer from './events/reducer';
import clubReducer from './clubs/reducer';
import authReducer from './auth/reducer';

const rootReducer = combineReducers({
  events: eventReducer,
  clubs: clubReducer,
  auth: authReducer
});

export default rootReducer;
