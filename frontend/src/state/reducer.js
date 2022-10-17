import { combineReducers } from 'redux';
import eventReducer from './events/reducer';

const rootReducer = combineReducers({
  events: eventReducer
});

export default rootReducer;
