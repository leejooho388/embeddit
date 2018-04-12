import React, { Component } from 'react';
import axios from 'axios';

export default class Subreddits extends Component {
  constructor(props){
    super(props);

    this.state = {
      subreddits: []
    }

    this.setSubreddits = this.setSubreddits.bind(this);
    this.getSubreddits = this.getSubreddits.bind(this);
  }

  setSubreddits(subreddits){
    this.setState({
      subreddits: subreddits
    });
  }

  getSubreddits(){
    var that = this;
    axios.get('http://localhost:8080/api/subreddit')
    .then(function(response){
      console.log(response.data);
      that.setSubreddits(response.data);
    }); 
  }

  componentWillMount(){
    this.getSubreddits();
  }
  
  render() {
    return (
      <div>
        <div>
          Create Subreddit
        </div>
        {this.state.subreddits.map(function(subreddit){
          return (
          <span key={subreddit._id}>
            <h1>{subreddit.name}</h1>
            <p>{subreddit.description}</p>
            <p>Subscriber Count: {subreddit.subscriberCount}</p>
          </span>
          );
        })}
      </div>
    );
  }
}