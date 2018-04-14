import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { Link } from 'react-router-dom';

class LogIn extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const endpoint = e.target.id === 'login-btn' ? 'login' : 'signup';
    this.props.logInUser(this.state, endpoint);
    this.setState({
      username: '',
      password: ''
    });
  }

  render() {
    return (
      <div className="login-box">
        <Form>
          <Form.Group widths='equal'>
            <Form.Input placeholder='username'
                        name="username"
                        size="mini"
                        id="login-form-uname"
                        onChange={this.handleInput.bind(this)}
                        value={this.state.username}
            />
            <Form.Input placeholder='password'
                        type="password"
                        name="password"
                        size="mini"
                        id="login-form-pw"
                        onChange={this.handleInput.bind(this)}
                        value={this.state.password}
            />
          </Form.Group>
          <strong>{this.props.error}</strong>
          <Link to="/signup"><button onClick={this.handleSubmit} id="signup-btn">sign up</button></Link>
          <button onClick={this.handleSubmit} id="login-btn">login</button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { error: state.error };
}

export default connect(mapStateToProps, actions)(LogIn);