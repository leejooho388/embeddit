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
  'updateSubscription': (subInfo, currentUser) => {
    dispatch(updateSubscription(subInfo, currentUser));
  }
})

const SUBSCRIBE = 'Subscribe';
const UNSUBSCRIBE = 'Unsubscribe';

export default connect (mapStateToProps, mapDispatchToProps)( class Subreddits extends Component {
  constructor(props){
    super(props);

    this.state = {
      subreddits: []
    }

    this.setSubreddits = this.setSubreddits.bind(this);
    this.getSubreddits = this.getSubreddits.bind(this);
    this.subscribeButtonTapped = this.subscribeButtonTapped.bind(this);
    this.isSubscribed = this.isSubscribed.bind(this);
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
    if (!this.props.user.authReducer.user) { 
      return console.log('Please Sign in to post'); 
    }
    let change = e.target.getAttribute('data') === SUBSCRIBE ? 1 : -1;
    this.props.updateSubscription({
      username: this.props.user.authReducer.user.username,
      change: change,
      subredditName: e.target.id
    }, this.props.user.authReducer.user);
  }

  isSubscribed(subName) {
    if (!this.props.user.authReducer.user) {
      return SUBSCRIBE;
    } 
    let userSubs = this.props.user.authReducer.user.subredditIds;
    return userSubs.includes(subName) ? UNSUBSCRIBE : SUBSCRIBE;
  }

  render() {
    let _this = this;
    return (
      <div className='subredditGrid'>
        {this.props.user.authReducer.user ? (<div className='subredditButton'><Link to="/subreddits/create"><Button fluid  >Create Subreddit</Button></Link></div>) : (<Message className='subredditButton' ><p>Please Log-in in order to Create a Subreddit</p></Message>)}
        <Grid>
          {this.state.subreddits.map(function(subreddit){
            return (
              <Grid container key={subreddit._id}>
                <Grid.Row  as={Link} to={`/r/${subreddit.name}`}>
                  <Grid.Column className='subredditGridSubscribe' width={3}>
                  </Grid.Column>
                  <Grid.Column width={13} >
                    <h3>{subreddit.name}</h3>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className='subredditListBottom' > 
                  <Grid.Column className='subredditGridSubscribe' width={3}>
                    <Button id={subreddit.name} data={_this.isSubscribed(subreddit.name)} onClick={_this.subscribeButtonTapped}>{_this.isSubscribed(subreddit.name)}</Button>
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