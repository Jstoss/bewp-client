import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { logout } from "../redux/actions";

import UserMenu from "../components/UserMenu";

//dev note: once logging in is updated, replace PersonIcon with new
//custom stateful component that can use Menus material component

const styles = theme => ({
  root: {
    padding: "0 25px"
  },
  toolbar: {
    "& > a": {
      textDecoration: 'none',
      color: 'inherit',
      fontSize: '20px'
    },
  }
});

const Titlebar = ({ isLoggedIn, classes, history, logout }) => {
  return (
    <AppBar position="static" className={classes.root}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Toolbar
            className={classes.toolbar}
          >
            <Link to="/">Lambda Notes</Link>
          </Toolbar>
        </Grid>
        <Grid item>
          {isLoggedIn && <UserMenu loggedIn logout={logout} />}
          {isLoggedIn || <UserMenu />}
        </Grid>
      </Grid>
    </AppBar>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { logout }
  )(Titlebar)
);
