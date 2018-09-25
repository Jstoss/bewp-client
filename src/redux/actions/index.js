import axios from "axios";

const URL = "https://js-lambda-note.herokuapp.com";
export const GETTING_NOTES = "LOGGING_ING";
export const NOTES_RECEIVED = "NOTES_RECEIVED";
export const NOTE_ERROR = "NOTE_ERROR";

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
