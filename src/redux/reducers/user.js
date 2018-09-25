import {LOGGED_IN, LOGGED_OUT, USER_ERROR} from '../actions';

const initialState = {
  isLoggedIn: false,
  username: null,
  token: null,
  userError: null,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return {
        userError: null,
        isLoggedIn: true,
        username: action.payload.username,
        token: action.payload.token
      }
    case LOGGED_OUT:
      return {
        userError: null,
        isLoggedIn: false,
        username: null,
        token: null
      }
    case USER_ERROR:
      return {
        ...state,
        userError: action.payload
      }
    default:
      return state;
  }
};
