import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { MarkdownPreview } from "react-marked-markdown";
import Typography from "@material-ui/core/Typography";
import { updateNote } from "../redux/actions";

import NoteForm from "./NoteForm";

const styles = theme => ({
  root: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    width: "75%",
    top: "10%",
    left: "50%",
    transform: `translate(-50%)`,
    overflowY: "scroll"
  }
});

class NotePage extends Component {
  state = {
    editing: false
  };

  componentDidMount() {
    const { title, token, content, id, user_id, currentUserId, username } = this.props;
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

  handleReturn = (updated, message) => {
    const errmsg = 'Something went wrong updating...';
    if (updated) {
      this.setState(state => ({
        editing: !state.editing,
      }));
    } else if (!updated && message) {
      this.setState({ message: errmsg + message });
    } else {
      this.setState({
        message: errmsg
      });
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
    } = this.state;
    return (
      <Paper className={root}>
        {editing && (
          <NoteForm
            {...this.state}
            change={this.handleChange}
            submit={this.handleSubmit}
          />
        )}
        {editing || (
          <React.Fragment>
            <Typography variant="headline" component="h1">
              {title}
            </Typography>
            <Typography component="h3">by {name}</Typography>
            <MarkdownPreview value={content} />
            {user_id === currentUserId && (
              <p onClick={this.toggleEditing}>edit</p>
            )}
          </React.Fragment>
        )}
      </Paper>
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
  { updateNote }
)(withStyles(styles)(NotePage));
