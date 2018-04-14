import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkJWT } from '../actions';

import { Route } from 'react-router-dom';

import { Grid } from 'semantic-ui-react'
import Content from './content.jsx';
import NavHead from './navHead.jsx';
import { Switch, Route } from 'react-router-dom';

import Head2 from './head2.jsx';
import Post from './post.jsx';
import Side from './side.jsx';

import LogIn from './LogIn.jsx';
import Subreddits from './Subreddits.jsx';
import Comments from './comment.jsx';
import CommentInputBox from './commentInputBox.jsx';

class App extends Component {

  componentDidMount() {
    // this.props.checkJWT();
  }

  render() {
    return (
      <div>
        <Route path="/" render={() =>
          <div>
            <NavHead />
            <Head2 />
            <Grid columns={16}>
              <Grid.Column width={13}>
                <Content />
              </Grid.Column>
              <Grid.Column width={3}>
                <Side />
              </Grid.Column>
            </Grid>

          </div>
          } />
          <Route path="/post" render={() =>
            <div>
              <NavHead />
              <Head2 />
              <Post />
            </div>
          } />
      </div>
    );
  }
};

export default connect(null, { checkJWT })(App);