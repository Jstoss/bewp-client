import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import Grid from "@material-ui/core/Grid";

import Titlebar from "./containers/Titlebar";
import Register from './containers/Register';
import Login from './containers/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Titlebar />
        <Grid container justify="center">
          <Grid item xs={4}>
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

export default App;
