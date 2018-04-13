import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    const self = this;
    e.preventDefault();
    const endpoint = e.target.id === 'login-btn' ? 'login' : 'signup';

    axios.post(`http://localhost:8080/api/${endpoint}`, this.state)
      .then(res => {

        const auth = JSON.parse(res.headers.auth);
        localStorage.setItem('token', auth.token);

        self.setState({
          username: '',
          password: ''
        });
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
          <Link to="/signup"><button onClick={this.handleSubmit} id="signup-btn">sign up</button></Link>
          <button onClick={this.handleSubmit} id="login-btn">login</button>
        </Form>
      </div>
    )
  }
}

export default LogIn;