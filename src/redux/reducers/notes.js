import { GETTING_NOTES, NOTES_RECEIVED, NOTE_ERROR } from "../actions";

const initialState = {
  notes: [],
  fetchingNotes: false,
  showingModal: false,
  noteError: null
};

export const note = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_NOTES:
      return {
        ...state,
        fetchingNotes: true
      };
    case NOTES_RECEIVED:
      return {
        ...state,
        notes: action.payload,
        fetchingNotes: false
      };
    case NOTE_ERROR:
      return {
        ...state,
        fetchingNotes: false,
        noteError: action.payload
      };
    default:
      return state;
  }
};
