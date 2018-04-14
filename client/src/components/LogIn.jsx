import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

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
                        onChange={this.handleInput}
                        value={this.state.username}
            />
            <Form.Input placeholder='password'
                        type="password"
                        name="password"
                        size="mini"
                        id="login-form-pw"
                        onChange={this.handleInput}
                        value={this.state.password}
            />
          </Form.Group>
          <strong id="login-error">{this.props.error}</strong>
          <button onClick={this.handleSubmit} id="login-btn">login</button>
        </Form>
        <button onClick={this.handleSubmit} id="signup-btn">sign up</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { error: state.authReducer.error };
}

export default connect(mapStateToProps, actions)(LogIn);