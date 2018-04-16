import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Message, Button } from 'semantic-ui-react';
import CreateSubreddits from './CreateSubreddit.jsx';
import { Link } from 'react-router-dom';


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
      that.setSubreddits(response.data);
    }); 
  }

  componentWillMount(){
    this.getSubreddits();
  }
  
  render() {
    return (
      <div className='subredditGrid'>
        <Link to="/subreddits/create" ><Button fluid>Create Subreddit</Button></Link>
        <Grid>
          {this.state.subreddits.map(function(subreddit){
            return (
              <Grid container key={subreddit._id}>
                <Grid.Row>
                  <Grid.Column className='subredditGridSubscribe' width={3}>
                  </Grid.Column>
                  <Grid.Column width={13}>
                    <h3>{subreddit.name}</h3>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column className='subredditGridSubscribe' width={3}>
                    Subscribe
                  </Grid.Column>
                  <Grid.Column width={13}>
                    <Message>
                      <p>Description: {subreddit.description}</p>
                    </Message>
                    <p className='subscriberCount'>Subscriber Count: {subreddit.subscriberCount}</p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

            );
          })}
        </Grid>
      </div>
    );
  }
}