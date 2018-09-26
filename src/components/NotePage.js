import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { MarkdownPreview } from "react-marked-markdown";
import Typography from "@material-ui/core/Typography";

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
    const { title, content, id, user_id, currentUserId } = this.props;
    this.setState({ title, content, id, user_id, currentUserId });
  }

  toggleEditing = () => {
    this.setState(state => ({ editing: !state.editing }));
  };

  render() {
    const {
      classes: { root }
    } = this.props;
    const { title, content, user_id, currentUserId, editing } = this.state;
    return (
      <Paper className={root}>
        {editing && <NoteForm {...this.state} />}
        {editing || (
          <React.Fragment>
            {user_id === currentUserId && <p onClick={this.toggleEditing}>edit</p>}
            <Typography variant="headline" component="h1">
              {title}
            </Typography>
            <MarkdownPreview value={content} />
          </React.Fragment>
        )}
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.user.id
  };
};

export default connect(mapStateToProps)(withStyles(styles)(NotePage));
