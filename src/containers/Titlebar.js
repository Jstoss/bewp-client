import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";

import UserMenu from "../components/UserMenu";

//dev note: once logging in is updated, replace PersonIcon with new
//custom stateful component that can use Menus material component

const styles = theme => ({
  root: {
    padding: "0 25px"
  },
  toolbar: {
    '&:hover': {
      cursor: 'pointer',
    }
  }
});

const Titlebar = ({ isLoggedIn, classes, user, history }) => {
  return (
    <AppBar position="static" className={classes.root}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Toolbar
            className={classes.toolbar}
            onClick={() => history.push("/")}
          >
            Lambda Notes
          </Toolbar>
        </Grid>
        <Grid item>
          {isLoggedIn && <UserMenu user={user} />}
          {isLoggedIn || <UserMenu />}
        </Grid>
      </Grid>
    </AppBar>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    user: state.user.username
  };
};

export default withRouter(
  withStyles(styles)(connect(mapStateToProps)(Titlebar))
);
