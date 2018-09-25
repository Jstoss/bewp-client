import React, { Component } from 'react';
import './App.css';
import Titlebar from './containers/Titlebar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Titlebar />
      </div>
    );
  }
}

export default App;
