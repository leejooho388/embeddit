import React, { Component } from 'react';
import axios from 'axios';
import { Message, Input, TextArea, Form, Button } from 'semantic-ui-react';
import NavHead from './NavHead.jsx';
import Head2 from './Head2.jsx';


export default class CreateSubreddits extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      description: '',
      error: true,
    }

    this.setName = this.setName.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.postSubreddit = this.postSubreddit.bind(this);
  }

  setName(event){
    this.setState({
      name: event.target.value,
    });
  }
  
  setDescription(event){
    this.setState({
      description: event.target.value,
    });
  }

  postSubreddit(){
    const that = this;
    axios.post('http://localhost:8080/api/subreddit', {
      name: this.state.name,
      description: this.state.description,
    })
    .then(function(response){
      console.log(response.data);
      if(response.data !== ''){
        that.setState({
          error: false,
        });
      } else {
        that.setState({
          name: '',
          description: '',
          error: true,
        });
      }
    })
    .catch(function(err){
      console.log('subreddit post request ', err);
    }); 
  }
  
  render() {
    return (

      <Form className='subredditInput' onSubmit={this.postSubreddit}>
        <Message hidden={this.state.error} negative>
          <Message.Header>The Subreddit already exists.</Message.Header>
        </Message>
        <Form.Field>
            <label>Enter the name of your subreddit:</label> 
            <Input className='subredditNameInput' value={this.state.name} onChange={this.setName} placeholder='Name of the Subreddit' />
          </Form.Field>
        <Form.Field>
            <label>Enter the description of the subreddit:</label>
            <TextArea rows='10' className='subredditTextAreaInput' value={this.state.description} onChange={this.setDescription} autoHeight placeholder='Your Description' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    );
  }
}