import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogIn from './Login.jsx';
import { Link } from 'react-router-dom';

import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'

class Side extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const renderLogIn = this.props.authenticated ? null : <LogIn />;

    return (
      <div className ="side">
        <form className="search" role="search">
          <Input fluid size="small" type="text" placeholder="search" />
        </form>
        {renderLogIn}
        {/* submit-link media*/}
        <Link to="/post" ><Button fluid id="post-link">Submit a new link</Button></Link>
        {/*<div className="sidebox submit submit-link">*/}
          {/*<div className="morelink">*/}
          {/*<a href="https://www.reddit.com/submit" data-event-action="submit" data-type="subreddit" data-event-detail="link" target="_top">Submit a new link</a>*/}
          {/*</div>*/}
        {/*</div>*/}
        {/* sumbit-textpost */}
        <Link to="/post" ><Button fluid id="post-text">Submit a text post</Button></Link>
        {/*<div className="sidebox submit submit-text">*/}
          {/*<div className="morelink">*/}
            {/*<a href="https://www.reddit.com/submit?selftext=true" data-event-action="submit" data-type="subreddit" data-event-detail="self"*/}
               {/*target="_top">Submit a new text post</a>*/}
          {/*</div>*/}
        {/*</div>*/}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { authenticated: state.authReducer.authenticated };
}

export default connect(mapStateToProps, null)(Side);