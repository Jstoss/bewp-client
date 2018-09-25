import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
  }
});

const NoteCard = ({ title, content, classes: { root } }) => {
  const message =
    content.length > 150 ? `${content.slice(0, 150)}...` : content;

  return (
    <Card className={root} elevation={4}>
      <CardContent>
        <Typography variant="headline" component="h2">
          {title}
        </Typography>
        <Typography component="p">{message}</Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(NoteCard);
