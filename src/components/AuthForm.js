import React from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import Slide from "@material-ui/core/Slide";
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    margin: "20px auto",
    maxWidth: "420px",
    width: "100%",
    padding: "20px 10px 20px"
  },
  avatar: {
    margin: "10px auto",
    width: 60,
    height: 60
  },
  form: {
    marginTop: "25px",
    width: "100%"
  },
  button: {
    marginTop: 15
  }
});

const AuthForm = ({
  submit,
  change,
  username,
  password,
  classes,
  message,
  email,
  register,
  direction,
  loading,
  response
}) => {
  return (
    <Slide direction={direction} in={true} timeout={1500}>
      <Paper className={classes.root} elevation={12}>
        <Avatar className={classes.avatar}>
          {loading ? (<CircularProgress size={60} color="primary" thickness={4} />) : (<PersonIcon />)}
        </Avatar>
        <Typography variant="headline" component="h3" align="center">
          {message}
        </Typography>
        {response && (
          <Typography component="p" align="center">
            {response}
          </Typography>
        )}
        <form onSubmit={submit} className={classes.form}>
          {register && (
            <FormControl required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                className={classes.input}
                onChange={change}
                name="email"
                value={email}
                id="email"
                error={email.length === 0 ? true : false}
              />
            </FormControl>
          )}
          <FormControl required fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              className={classes.input}
              onChange={change}
              name="username"
              value={username}
              id="username"
              error={username.length === 0 ? true : false}
            />
          </FormControl>
          <FormControl required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              className={classes.input}
              onChange={change}
              name="password"
              value={password}
              id="password"
              type="password"
              error={password.length === 0 ? true : false}
            />
          </FormControl>
          <Button
            type="submit"
            variant="extendedFab"
            className={classes.button}
            color="primary"
            fullWidth
            disabled={
              register
                ? password.length === 0 ||
                  username.length === 0 ||
                  email.length === 0
                : password.length === 0 || username.length === 0
            }
          >
            {message}
          </Button>
        </form>
      </Paper>
    </Slide>
  );
};

export default withStyles(styles)(AuthForm);
