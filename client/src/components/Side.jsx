import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogIn from './LogIn.jsx';
import { Link } from 'react-router-dom';

import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'

class Side extends Component {
  constructor(props) {
    super(props);
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

    return (
      <div className ="side">
        <form className="search" role="search">
          <Input fluid size="small" type="text" placeholder="search" />
        </form>
        {renderLogIn}
        {renderLinkPostBtn}
        {renderTextPostBtn}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { authenticated: state.authReducer.authenticated };
}

export default connect(mapStateToProps, null)(Side);