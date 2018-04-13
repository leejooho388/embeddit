import React, { Component } from 'react';
import Content from './content.jsx';
import NavHead from './navHead.jsx';
import Head2 from './head2.jsx';
<<<<<<< 887a68468f4679929200bf35c2ad02edea8361a3

import Post from './Post.jsx'
=======
import Post from './post.jsx';
>>>>>>> Fixed post form css width and saves to mongo properly
export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Embeddit</h1>
        <NavHead />
        <Head2 />
        {/* <Content /> */}
        <Post />
<<<<<<< 887a68468f4679929200bf35c2ad02edea8361a3
        {/*{this.props.children}*/}
=======
>>>>>>> Fixed post form css width and saves to mongo properly
      </div>
    );
  }
}