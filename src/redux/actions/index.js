import axios from "axios";

const URL = "https://js-lambda-note.herokuapp.com";
export const GETTING_NOTES = "LOGGING_ING";
export const NOTES_RECEIVED = "NOTES_RECEIVED";
export const NOTE_ERROR = "NOTE_ERROR";
export const LOGGED_IN = "LOGGED_IN";
export const LOGGED_OUT = "LOGGED_OUT";
export const USER_ERROR = "USER_ERROR";
export const CHECK_PASSED = "CHECK_PASSED";
export const CHECK_FAILED = "CHECK_FAILED";
export const NOTES_UPDATED = "NOTES_UPDATED";

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

export const register = (user, cb, history) => {
  return async function(dispatch) {
    try {
      let response = await axios.post(URL + "/api/register", user);
      localStorage.setItem("JLN-USER-TOKEN", response.data.token);
      dispatch({ type: LOGGED_IN, payload: response.data });
      history.push("/");
    } catch (e) {
      cb(e.response.data.message);
      dispatch({ type: USER_ERROR, payload: e });
    }
  };
};

export const login = (user, cb, history) => {
  return async function(dispatch) {
    try {
      let response = await axios.post(URL + "/api/login", user);
      localStorage.setItem("JLN-USER-TOKEN", response.data.token);
      dispatch({ type: LOGGED_IN, payload: response.data });
      history.push("/");
    } catch (e) {
      cb(e.response.data.message);
      dispatch({ type: USER_ERROR, payload: e });
    }
  };
};

export const addNote = (note, cb, token) => {
  return async function(dispatch) {
    try{
      const options = {
        headers: {
          Authorization: token
        }
      };
      let response = await axios.post(URL + '/api/notes', note, options);
      dispatch({ type: NOTES_UPDATED, payload: response.data });
      cb(true);
    }catch(e){
      if(e.response){
        cb(false, e.response.data.message);
      }else{
        cb(false);
      }
    }
  }
}

export const updateNote = (note, cb, token) => {
  return async function(dispatch) {
    try {
      const options = {
        headers: {
          Authorization: token
        }
      };
      let response = await axios.put(
        URL + `/api/notes/${note.id}`,
        note,
        options
      );
      cb(true);
      dispatch({ type: NOTES_UPDATED, payload: response.data });
    } catch (e) {
      cb(false, e.response.data.message);
    }
  };
};

export const deleteNote = (id, cb, token) => {
  return async function(dispatch) {
    try {
      const options = {
        headers: {
          Authorization: token
        }
      };
      let response = await axios.delete(URL + `/api/notes/${id}`, options);
      cb(true);
      dispatch({ type: NOTES_UPDATED, payload: response.data });
    } catch (e) {
      if (e.response) {
        cb(false, e.response.data.message);
      } else {
        cb(false, e.message);
      }
    }
  };
};

export const logout = () => {
  localStorage.removeItem("JLN-USER-TOKEN");
  return {
    type: LOGGED_OUT
  };
};

export const checkToken = () => {
  return async function(dispatch) {
    if (localStorage.getItem("JLN-USER-TOKEN")) {
      try {
        const token = localStorage.getItem("JLN-USER-TOKEN");
        const options = {
          headers: {
            Authorization: token
          }
        };
        let response = await axios.get(URL + "/api", options);
        localStorage.setItem("JLN-USER-TOKEN", response.data.token);
        dispatch({ type: LOGGED_IN, payload: response.data });
      } catch (e) {
        console.log(e);
        dispatch({ type: LOGGED_OUT });
      }
    } else {
      dispatch({ type: LOGGED_OUT });
    }
  };
};
