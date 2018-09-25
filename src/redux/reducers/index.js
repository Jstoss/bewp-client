import { combineReducers } from 'redux';
import { note } from './notes';
import { user } from './user';

export const rootReducer = combineReducers({
  note,
  user
});
