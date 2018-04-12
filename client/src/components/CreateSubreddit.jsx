import React, { Component } from 'react';
import axios from 'axios';
import { Input, TextArea } from 'semantic-ui-react'

export default class CreateSubreddits extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      description: '',
    }
  }

  setName(name){
    this.setState({
      name: name,
    });
  }
  
  setDescription(description){
    this.setState({
      description: description,
    });
  }

  postSubreddit(){
    axios.post('http://localhost:8080/api/subreddit', {
      name: this.name,
      description: this.description,
    })
    .catch(function(err){
      console.log('subreddit post request ', err);
    }); 
  }
  
  render() {
    return (
      <div>
        <Input placeholder='Name of the Subreddit' />
        <TextArea autoHeight placeholder='Your Description' />
      </div>
    );
  }
}