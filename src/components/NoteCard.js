import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import NotePage from './NotePage';

class NoteCard extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { title, content, username } = this.props;
    const message =
      content.length > 150 ? `${content.slice(0, 150)}...` : content;
    return (
      <React.Fragment>
        <Card elevation={4} onClick={this.handleOpen}>
          <CardContent>
            <Typography variant="headline" component="h2">
              {title}
            </Typography>
            <Typography component="h3">
              by {username.toUpperCase()}
            </Typography>
            <Typography component="p">{message}</Typography>
          </CardContent>
        </Card>
        <Modal
          aria-labelledby="note-modal"
          aria-describedby="full-note-display"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <NotePage {...this.props} />
        </Modal>
      </React.Fragment>
    );
  }
}

export default NoteCard;
