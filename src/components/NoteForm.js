import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
  },
  button: {
    width: '75%',
    marginTop: 15
  }
})

const NoteForm = ({ submit, change, title, content, classes: { root, button } }) => {
  return (
    <form onSubmit={submit} className={root}>
        <TextField
          onChange={change}
          name="title"
          value={title}
          error={title.length === 0 ? true : false}
        />
        <TextField
          fullWidth
          onChange={change}
          id="content"
          multiline
          rows="16"
          name="content"
          value={content}
          error={content.length === 0 ? true : false}
        />
      <Button
        type="submit"
        variant="extendedFab"
        color="primary"
        className={button}
        disabled={title.length === 0 || content.length === 0}
      >
        Submit
      </Button>
    </form>
  );
};

export default withStyles(styles)(NoteForm);
