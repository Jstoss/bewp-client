import React from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import PersonIcon from "@material-ui/icons/Person";

//dev note: once logging in is updated, replace PersonIcon with new
//custom stateful component that can use Menus material component

const styles = theme => ({
  root: {
    padding: '0 25px',
  },
})

const Titlebar = ({ isLoggedIn, classes }) => {
  return (
    <AppBar position="static" className={classes.root}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Toolbar>Lambda Notes</Toolbar>
        </Grid>
        <Grid item>{isLoggedIn && <PersonIcon />}</Grid>
      </Grid>
    </AppBar>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

export default withStyles(styles)(connect(mapStateToProps)(Titlebar));
