import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkJWT } from '../actions';

import { Grid } from 'semantic-ui-react'
import Content from './Content.jsx';
import NavHead from './NavHead.jsx';
import { Switch, Route, BrowserRouter, withRouter } from 'react-router-dom';

import Head2 from './Head2.jsx';
import Post from './Post.jsx';
import Side from './Side.jsx';

import LogIn from './LogIn.jsx';
import Subreddits from './Subreddits.jsx';
import Comments from './Comment.jsx';
import CommentInputBox from './CommentInputBox.jsx';
import CreateSubreddit from './CreateSubreddit.jsx';
<<<<<<< HEAD
import PostPage from './PostPage.jsx';
=======
>>>>>>> merged after rebase2

class App extends Component {

  componentDidMount() {
    this.props.checkJWT();
  }

  render() {
    return (
      <div>
        <NavHead />
        <Route component={Head2}/>
        <Grid columns={16}>
            <Grid.Column width={13}>
              <main>
                <PostPage />
                 <Switch>
                  <Route exact path='/' component={Content} />
                  <Route exact path='/subreddits' component={Subreddits} />
                  <Route path='/post' component={Post} />
                  <Route path='/r/:query' component={Content} />
                  <Route path='/subreddits/create' component={CreateSubreddit} />
                </Switch> */}
              </main>
            </Grid.Column>
          <Grid.Column width={3}>
            <Side />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
};

export default withRouter(connect(null, { checkJWT })(App));