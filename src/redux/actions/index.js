import axios from "axios";

const URL = "https://js-lambda-note.herokuapp.com";
export const GETTING_NOTES = "LOGGING_ING";
export const NOTES_RECEIVED = "NOTES_RECEIVED";
export const NOTE_ERROR = "NOTE_ERROR";
export const LOGGED_IN = "LOGGED_IN";
export const LOGGED_OUT = "LOGGED_OUT";
export const USER_ERROR = "USER_ERROR";

export const fetchNotes = () => {
  return async function(dispatch) {
    dispatch({ type: GETTING_NOTES });
    try {
      const response = await axios.get(URL + "/api/notes");
      dispatch({ type: NOTES_RECEIVED, payload: response.data });
    } catch (e) {
      dispatch({ type: NOTE_ERROR, payload: e });
    }
  };
};

export const register = (user, history) => {
  return async function(dispatch) {
    try{
      let response = await axios.post(URL + '/api/register', user);
      localStorage.setItem('JLN-USER-TOKEN', JSON.stringify(response.data.token));
      dispatch({ type: LOGGED_IN, payload: response.data });
      history.push('/');
    }catch(e){
      dispatch({ type: USER_ERROR, payload: e });
    }
  }
};

export const login = (user, history) => {
  return async function(dispatch) {
    try{
      let response = await axios.post(URL + '/api/login', user);
      localStorage.setItem('JLN-USER-TOKEN', JSON.stringify(response.data.token));
      dispatch({ type: LOGGED_IN, payload: response.data });
      history.push('/');
    }catch(e){
      dispatch({ type: USER_ERROR, payload: e });
    }
  }
};

export const logout = () => {
  localStorage.removeItem('JLN-USER-TOKEN');
  return {
    type: LOGGED_OUT
  }
}
