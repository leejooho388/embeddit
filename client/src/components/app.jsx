import React, { Component } from 'react';
import Home from './home.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Embeddit</h1>
        <Home />
      </div>
    );
  }
}