import React, { Component } from "react";
import { fetchNotes } from "../redux/actions";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import NoteCard from "../components/NoteCard";

class Home extends Component {
  componentDidMount() {
    this.props.fetchNotes();
  }

  render() {
    const { notes, isLoading } = this.props;

    return (
      <Grid container justify="center">
        {isLoading ? (
          <Grid item>
            <h1>Loading...</h1>
          </Grid>
        ) : (
          <React.Fragment>
            {notes.map(note => (
              <Grid item>
                <NoteCard key={note.id} {...note} />
              </Grid>
            ))}
          </React.Fragment>
        )}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.note.notes,
    isLoading: state.note.fetchingNotes
  };
};

export default connect(
  mapStateToProps,
  { fetchNotes }
)(Home);
