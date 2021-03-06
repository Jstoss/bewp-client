import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { addNote } from "../redux/actions";

import NoteForm from "../components/NoteForm";

const styles = theme => ({
  root: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    width: "75%",
    top: "10%",
    left: "50%",
    transform: "translate(-50%)",
    overflowY: "scroll"
  }
});

class AddNote extends Component {
  state = {
    title: "",
    content: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const newNote = {
      title: this.state.title,
      content: this.state.content
    };
    this.props.addNote(newNote, this.handleFinish, this.props.token)
  };

  handleFinish = (success, message) => {
    const errmsg = "Something went wrong adding note...";
    if (success) {
      this.props.close();
    } else if (!success && message) {
      this.setState({ message: errmsg + message });
    } else {
      this.setState({ message: errmsg });
    }
  };

  render() {
    return (
      <Paper className={this.props.classes.root}>
        <NoteForm
          message={this.state.message}
          title={this.state.title}
          content={this.state.content}
          submit={this.handleSubmit}
          change={this.handleChange}
        />
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.token
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { addNote }
  )(AddNote)
);
