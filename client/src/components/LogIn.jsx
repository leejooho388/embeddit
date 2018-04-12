import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class LogIn extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      pw: ''
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
        self.setState({
          username: '',
          pw: ''
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
                        name="pw"
                        size="mini"
                        id="login-form-pw"
                        onChange={this.handleInput.bind(this)}
                        value={this.state.pw}
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