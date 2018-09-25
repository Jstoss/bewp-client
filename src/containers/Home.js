import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { fetchNotes } from "../redux/actions";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import NoteCard from "../components/NoteCard";
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: '20px',
  }
});

class Home extends Component {
  componentWillMount() {
    this.props.fetchNotes();
  }

  render() {
    const { notes, isLoading, classes } = this.props;

    return (
      <Grid
        className={classes.root}
        container
        spacing={8}
      >
        {isLoading ? (
          <Grid item xs={12}>
            <CircularProgress size={75}/>
          </Grid>
        ) : (
          <React.Fragment>
            {notes.map(note => (
              <Grid item xs={12}>
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

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { fetchNotes }
  )(Home)
);
