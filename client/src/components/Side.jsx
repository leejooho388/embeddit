import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogIn from './LogIn.jsx';
import { Link } from 'react-router-dom';

import { Button } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import { updateSubscription } from '../actions';
import axios from 'axios';

class Side extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subreddit: undefined,
    }

    this.subscribeButtonTapped = this.subscribeButtonTapped.bind(this);
    this.isSubscribed = this.isSubscribed.bind(this);
  }

  subscribeButtonTapped(e) {
    if (!this.props.user.authReducer.user) { 
      return console.log('Please Sign in to post'); 
    }
    let change = e.target.getAttribute('data') === SUBSCRIBE ? 1 : -1;
    this.props.updateSubscription({
      username: this.props.user.authReducer.user.username,
      change: change,
      subredditName: e.target.id
    }, this.props.user.authReducer.user);
  }

  isSubscribed(subName) {
    if (!this.props.user.authReducer.user) {
      return SUBSCRIBE;
    } 
    let userSubs = this.props.user.authReducer.user.subredditIds;
    return userSubs.includes(subName) ? UNSUBSCRIBE : SUBSCRIBE;
  }

  getSubredditInfo(path){
    const that = this;
    let splitUrl = path.split('/');
      if(splitUrl[1] === 'r' || splitUrl[1] === 'comments'){
        axios.get(`/api/subreddit/${splitUrl[2]}`)
        .then( response => {
          if(response.data.length === 1){
            that.setState({
              subreddit: response.data[0]
            });
          }
        });
      } else {
        that.setState({
          subreddit: undefined,
        });
      }
  }

  componentDidMount(){
    this.getSubredditInfo(this.props.history.location.pathname);
    this.unlisten = this.props.history.listen((location) => {
      this.getSubredditInfo(location.pathname);
    })
  }

  componentWillUnmount(){
    this.unlisten();
  }

  render() {

    const renderLogIn = this.props.authenticated ? null : <LogIn />;

    const renderLinkPostBtn = this.props.authenticated ? (
      <Link to={{pathname: "/post", query: "link"}} ><Button fluid id="post-link">Submit a new link</Button></Link>
    ) : (
      null
    );

    const renderTextPostBtn = this.props.authenticated ? (
      <Link to={{pathname: "/post", query: "text"}} ><Button fluid id="post-text">Submit a text post</Button></Link>
    ) : (
      null
    );

  const subredditDetails = this.state.subreddit === undefined ? (<div></div>) : (
      <div>
        <h3>{`/r/${this.state.subreddit.name}`}</h3>
        <p>Description: {this.state.subreddit.description}</p>
        <p className='subscriberCount'>Subscriber Count: {this.state.subreddit.subscriberCount}</p>
        <Button id={this.state.subreddit.name} data={this.isSubscribed(this.state.subreddit.name)} onClick={this.subscribeButtonTapped}>{this.isSubscribed(this.state.subreddit.name)}</Button>
      </div>
    )

    return (
      <div className ="side">
        {renderLogIn}
        {renderLinkPostBtn}
        {renderTextPostBtn}
        {subredditDetails}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    authenticated: state.authReducer.authenticated,
    user: state
   };
}


const mapDispatchToProps = (dispatch) => ({
  'updateSubscription': (subInfo, currentUser) => {
    dispatch(updateSubscription(subInfo, currentUser));
  }
})

const SUBSCRIBE = 'Subscribe';
const UNSUBSCRIBE = 'Unsubscribe';

export default connect(mapStateToProps, mapDispatchToProps, null)(Side);