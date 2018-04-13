import React, { Component } from 'react';
import Content from './content.jsx';
import NavHead from './navHead.jsx';
import Head2 from './head2.jsx';
import Subreddits from './Subreddits.jsx';
import CreateSubreddits from './CreateSubreddit.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Embeddit</h1>
        <NavHead />
        <Head2 />
        {/* <Content /> */}
        <Subreddits />
        {/*{this.props.children}*/}
      </div>
    );
  }
}