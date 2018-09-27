import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { fetchNotes } from "../redux/actions";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";

import NoteCard from "../components/NoteCard";
import AddNote from "./AddNote";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: "20px"
  },
  spinner: {
    margin: "0 auto"
  }
});

class Home extends Component {
  state = {
    editing: false
  };

  componentWillMount() {
    this.props.fetchNotes();
  }

  handleOpen = () => {
    this.setState({ editing: true });
  };

  handleClose = () => {
    this.setState({ editing: false });
  };

  render() {
    const { notes, isLoading, classes } = this.props;

    return (
      <React.Fragment>
        <Modal
          aria-labelledby="add-note-modal"
          aria-describedby="note-editing-modal"
          open={this.state.editing}
          onClose={this.handleClose}
        >
          <AddNote />
        </Modal>
        <Grid className={classes.root} container spacing={8}>
          {isLoading && (
            <Grid item xs={12}>
              <CircularProgress className={classes.spinner} size={75} />
            </Grid>
          )}
          {isLoading || (
            <React.Fragment>
              <Grid container justify="center">
                <Grid item>
                  <Button
                    variant="fab"
                    color="primary"
                    aria-label="Add"
                    onClick={this.handleOpen}
                  >
                    <AddIcon />
                  </Button>
                </Grid>
              </Grid>
              {notes.map(note => (
                <Grid item xs={12} key={note.id}>
                  <NoteCard {...note} />
                </Grid>
              ))}
            </React.Fragment>
          )}
        </Grid>
      </React.Fragment>
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
