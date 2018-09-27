import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { MarkdownPreview } from "react-marked-markdown";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { updateNote, deleteNote } from "../redux/actions";
import Grid from "@material-ui/core/Grid";

import NoteForm from "./NoteForm";

const styles = theme => ({
  root: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    width: "75%",
    height: "75%",
    top: "10%",
    left: "50%",
    transform: `translate(-50%)`,
    overflowY: "scroll"
  },
});

class NotePage extends Component {
  state = {
    editing: false,
    attemptingDelete: false
  };

  componentDidMount() {
    const {
      title,
      token,
      content,
      id,
      user_id,
      currentUserId,
      username
    } = this.props;
    this.setState({
      title,
      content,
      id,
      user_id,
      currentUserId,
      username,
      token,
      name: username.toUpperCase()
    });
  }

  toggleEditing = () => {
    this.setState(state => ({ editing: !state.editing }));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const newNote = {
      title: this.state.title,
      content: this.state.content,
      id: this.state.id
    };
    this.props.updateNote(newNote, this.handleReturn, this.state.token);
  };

  handleEditCancel = () => {
    this.setState({
      editing: false,
      title: this.props.title,
      content: this.props.content
    });
  };

  handleReturn = (updated, message) => {
    const errmsg = "Something went wrong updating...";
    if (updated) {
      this.setState(state => ({
        editing: !state.editing
      }));
    } else if (!updated && message) {
      this.setState({ message: errmsg + message });
    } else {
      this.setState({
        message: errmsg
      });
    }
  };

  attemptDelete = () => {
    this.setState({ attemptingDelete: true });
  };

  cancelDelete = () => {
    this.setState({ attemptingDelete: false });
  };

  confirmDelete = () => {
    this.props.deleteNote(this.state.id, this.handleFinish, this.state.token);
  };

  handleFinish = (success, msg) => {
    const errMsg = "Something went wrong deleting the note...";
    if (success) {
      this.setState({ attemptingDelete: false });
    } else if (!success && msg) {
      this.setState({ delError: errMsg + msg });
    } else {
      this.setState({ delError: errMsg });
    }
  };

  render() {
    const {
      classes: { root }
    } = this.props;
    const {
      title,
      content,
      user_id,
      currentUserId,
      editing,
      name,
      attemptingDelete,
      errMsg,
      delError
    } = this.state;
    return (
      <React.Fragment>
        <Paper className={root}>
          {editing && (
            <NoteForm
              {...this.state}
              cancel={this.handleEditCancel}
              change={this.handleChange}
              submit={this.handleSubmit}
            />
          )}
          {editing ||
            attemptingDelete || (
              <React.Fragment>
                <Typography variant="headline" component="h1">
                  {title}
                </Typography>
                <Typography component="h3">by {name}</Typography>
                <MarkdownPreview
                  value={content}
                  markedOptions={{ sanitize: true }}
                />
                {user_id === currentUserId && (
                  <React.Fragment>
                    <Button onClick={this.toggleEditing} color="primary">
                      Edit
                    </Button>
                    <Button onClick={this.attemptDelete} color="secondary">
                      Delete
                    </Button>
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          {attemptingDelete && (
            <React.Fragment>
              {delError && (
                <Typography variant="headline" component="h4">
                  {errMsg}
                </Typography>
              )}
              <Grid container justify="center" alignItems="center" spacing={24}>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={this.confirmDelete}
                    color="secondary"
                  >
                    Confirm
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={this.cancelDelete}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </Paper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.user.id,
    token: state.user.token
  };
};

export default connect(
  mapStateToProps,
  { updateNote, deleteNote }
)(withStyles(styles)(NotePage));
