import React, { Component } from "react";
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from "react-router-dom";
import "./App.css";
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from "./containers/Home";
import Grid from "@material-ui/core/Grid";

import Titlebar from "./containers/Titlebar";
import Register from './containers/Register';
import Login from './containers/Login';

import { checkToken } from './redux/actions';

class App extends Component {
  componentWillMount(){
    this.props.checkToken();
  }

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Titlebar />
        <Grid container justify="center">
          <Grid item xs={6}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(connect(null, { checkToken })(App));
