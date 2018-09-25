import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Titlebar from "./containers/Titlebar";
import Home from "./containers/Home";
import Grid from "@material-ui/core/Grid";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Titlebar />
        <Grid container justify="center">
          <Grid item xs={4}>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
