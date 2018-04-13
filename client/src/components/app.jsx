import React, { Component } from 'react';
import Content from './content.jsx';
import NavHead from './navHead.jsx';

import Head2 from './head2.jsx';
import Post from './post.jsx';

import LogIn from './LogIn.jsx';
import Subreddits from './Subreddits.jsx';
import Comments from './comment.jsx';
import CommentInputBox from './commentInputBox.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavHead />
        <Head2 />
        <LogIn />
        <Post />
        <Content />
        {/* <Content /> */}
        <Post />
        {/* <Subreddits /> */}
        <CommentInputBox />
        {/* <Comments /> */}
      </div>
    );
  }
}