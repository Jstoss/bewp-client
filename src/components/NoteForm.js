import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    height: "100%"
  },
  button: {
    width: "50%",
    marginTop: 15
  }
});

const NoteForm = ({
  submit,
  change,
  title,
  content,
  classes: { root, button },
  message,
  cancel
}) => {
  return (
    <form onSubmit={submit} className={root}>
      <TextField
        required
        label="title"
        onChange={change}
        name="title"
        placeholder="Title"
        margin="normal"
        value={title}
        error={title.length === 0 ? true : false}
      />
      <TextField
        required
        fullWidth
        onChange={change}
        label="content"
        id="content"
        multiline
        rows="16"
        name="content"
        placeholder="Content"
        margin="normal"
        value={content}
        error={content.length === 0 ? true : false}
      />
      {message && <Typography component="h4">{message}</Typography>}
      <Button
        type="submit"
        variant="extendedFab"
        color="primary"
        className={button}
        disabled={title.length === 0 || content.length === 0}
      >
        Submit
      </Button>
      <Button
        variant="extendedFab"
        color="default"
        className={button}
        onClick={cancel}
      >
        Cancel
      </Button>
    </form>
  );
};

export default withStyles(styles)(NoteForm);
