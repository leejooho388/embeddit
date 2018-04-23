import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogIn from './LogIn.jsx';
import { Link } from 'react-router-dom';

import { Button } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import axios from 'axios';

class Side extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subreddit: undefined,
    }
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
          } else if (response.data.length > 1) {
            console.log('fix later');
          }
        });
      } else {
        that.setState({
          subreddit: undefined,
        });
      }
  }

  componentWillMount(){
    this.getSubredditInfo(this.props.history.location.pathname);
    this.props.history.listen((location) => {
      this.getSubredditInfo(location.pathname);
    })
  }

  render() {

    const renderLogIn = this.props.authenticated ? null : <LogIn />;

    const renderLinkPostBtn = this.props.authenticated ? (
      <Link to="/post" query='link' ><Button fluid id="post-link">Submit a new link</Button></Link>
    ) : (
      null
    );

    const renderTextPostBtn = this.props.authenticated ? (
      <Link to="/post" query='text' ><Button fluid id="post-text">Submit a text post</Button></Link>
    ) : (
      null
    );

  const subredditDetails = this.state.subreddit === undefined ? (<div></div>) : (
      <div>
        <h3>{`/r/${this.state.subreddit.name}`}</h3>
        <p>Description: {this.state.subreddit.description}</p>
        <p className='subscriberCount'>Subscriber Count: {this.state.subreddit.subscriberCount}</p>
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
  return { authenticated: state.authReducer.authenticated };
}

export default connect(mapStateToProps, null)(Side);