import React, { Component } from 'react';
import Content from './content.jsx';
import NavHead from './navHead.jsx';

import Head2 from './head2.jsx';
import Post from './post.jsx';

import LogIn from './LogIn.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavHead />
        <Head2 />
        <Post />
        <Content />
        <LogIn />
      </div>
    );
  }
}