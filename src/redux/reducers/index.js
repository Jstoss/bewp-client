import { combineReducers } from 'redux';
import { noteReducer } from './notes';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  noteReducer,
  userReducer
});
