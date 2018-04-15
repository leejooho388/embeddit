import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Message, Button } from 'semantic-ui-react';
import CreateSubreddits from './CreateSubreddit.jsx';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateSubscription } from '../actions';

const mapStateToProps = (state) => ({
  user: state
})

const mapDispatchToProps = (dispatch) => ({
  'updateSubscription': (user) => {
    dispatch(updateSubscription(user));
  }
})

export default connect (mapStateToProps, mapDispatchToProps)( class Subreddits extends Component {
  constructor(props){
    super(props);

    this.state = {
      subreddits: []
    }

    this.setSubreddits = this.setSubreddits.bind(this);
    this.getSubreddits = this.getSubreddits.bind(this);
    this.subscribeButtonTapped = this.subscribeButtonTapped.bind(this);
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

  subscribeButtonTapped(e) {
    this.props.updateSubscription({
      username: this.props.user.authReducer.user.username,
      change: 1,
      subredditName: e.target.id
    });
  }
  
  render() {
    let _this = this;
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
                    <Button id={subreddit.name} onClick={_this.subscribeButtonTapped}>Subscribe</Button>
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
})