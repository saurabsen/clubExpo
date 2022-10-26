import { combineReducers } from 'redux';
import eventReducer from './events/reducer';
import clubReducer from './clubs/reducer';

const rootReducer = combineReducers({
  events: eventReducer,
  clubs: clubReducer
});

export default rootReducer;
