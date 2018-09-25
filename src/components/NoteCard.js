import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const NoteCard = ({ title, content }) => {
  const message =
    content.length > 150 ? `${content.slice(0, 150)}...` : content;

  return (
    <Card>
      <CardContent>
        <Typography variant="headline" component="h2">
          {title}
        </Typography>
        <Typography component="p">{message}</Typography>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
