import React, { Component } from 'react';
import Content from './content.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Embeddit</h1>
        <Content />
      </div>
    );
  }
}