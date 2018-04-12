import React, { Component } from 'react';
import axios from 'axios';
import { Segment, Grid } from 'semantic-ui-react'

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
      <Grid>
        Subreddits:
        {this.state.subreddits.map(function(subreddit){
          return (
          <Grid.Row key={subreddit._id}>
            <Grid.Column width={3}>
              Subscribe
            </Grid.Column>
            <Grid.Column width={13}>
              <h1>{subreddit.name}</h1>
              <p>Description: {subreddit.description}</p>
              <p>Subscriber Count: {subreddit.subscriberCount}</p>
            </Grid.Column>
          </Grid.Row>
          );
        })}
      </Grid>
    );
  }
}