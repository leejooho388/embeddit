import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Grid } from 'semantic-ui-react';
import axios from 'axios';
import Moment from 'moment';

class Content extends Component {
  constructor(props) {
    super(props),
    this.state = {
      posts: []
    }
    this.getPosts = this.getPosts.bind(this);
    this.handleVoteClick = this.handleVoteClick.bind(this);
  }

  getPosts() {
    axios.get('/api/post')
      .then( response => {
        this.setState({posts: response.data})
      })
      .catch( err => {
        console.error('Unable to fetch posts data.');
      });
  }

  componentDidMount() {
    this.getPosts();
  }

  handleVoteClick(e) {
    const id = e.target.getAttribute('data-id');
    const vote = e.target.getAttribute('data-dir');
    let post_i;
    let i;

    for (i = 0; i < this.state.posts.length; i++) {
      post_i = this.state.posts[i];
      if (post_i._id === id) {
        break;
      }
    }

    const hasVoteHistory = post_i.hasOwnProperty('voteHistoryUser');

    post_i.voteHistoryUser = post_i.voteHistoryUser || {};

    if (hasVoteHistory && this.props.user._id in post_i.voteHistoryUser) {
      if (post_i.voteHistoryUser[this.props.user._id] > 0) {
        // Post was previously upvoted
        if (vote === 'up') {
          // if post is already upvoted and vote is up, unvote
          this.removeVote(post_i, i, this.props.user._id);
        } else if (vote === 'down') {
          // if post is already upvoted and vote is down, switch vote to down
          this.voteOnPost(post_i, i,  this.props.user._id, -1);
        }
      } else {
        // Post was previously downvoted
        if (vote === 'down') {
          // if post is already downvoted and vote is down, unvote
          this.removeVote(post_i, i, this.props.user._id);
        } else if (vote === 'up') {
          // if post is already downvoted and vote is up, switch vote to up
          this.voteOnPost(post_i, i, this.props.user._id, 1);
        }
      }
    } else {
      // No previous vote history
      if (vote === 'up') {
        this.voteOnPost(post_i, i, this.props.user._id, 1);
      } else {
        this.voteOnPost(post_i, i, this.props.user._id, -1);
      }
    }

  }

  voteOnPost(post, index, userId, vote) {
    const voteInfo = {
      postId: post._id,
      userId,
      vote
    }

    // axios.post('/r/:subreddit/:id/vote')
    axios.post(`/r/${post.subredditName}/${post._id}/vote`, voteInfo);

    let newStatePosts = this.state.posts;
    let changedPost = newStatePosts[index];
    changedPost.voteHistoryUser[userId] = vote;
    this.setState({
      posts: newStatePosts
    });
  }


  removeVote(post, index, userId) {

    const voteInfo = {
      postId: post._id,
      userId: userId,
    }

    // axios.delete('/r/:subreddit/:id/vote')
    axios.delete(`/r/${post.subredditName}/${post._id}/vote`, voteInfo);

    let newStatePosts = this.state.posts;
    let changedPost = newStatePosts[index];
    let changedVoteHistory = changedPost.voteHistoryUser;
    delete changedVoteHistory[userId];
    changedPost.voteHistoryUser = changedVoteHistory;
    newStatePosts[index] = changedPost;
    this.setState({
      posts: newStatePosts
    });
  }

  render() {

    return(
      <div>
      {this.state.posts.map( post => {

        let upColor = 'grey';
        let downColor = 'grey';
        let numColor = 'grey';

        if (post.voteHistoryUser) {
          if (this.props.user._id in post.voteHistoryUser) {
            if (post.voteHistoryUser[this.props.user._id] > 0) {
              upColor = 'orange';
              numColor = '#E37737';
            } else {
              downColor = 'violet';
              numColor = '#5B3FC2';
            }
          }
        }

        const numStyle = {
          'color': numColor,
          'fontWeight': 'bold',
          'fontFamily': 'wide block',
          'fontSize': '20px'
        };

        return (
          <Grid key={post._id}>
            <Grid.Row>
              <Grid.Column width={1} verticalAlign='middle' textAlign='center' floated='left'>
              {/* post count */}
                {/* TODO in future {i + 1} */}
              </Grid.Column>
        
              <Grid.Column width={1} floated='left'>
                <Grid celled='internally'>
                  <Grid.Row centered={true}>
                    <Icon onClick={this.handleVoteClick} data-id={post._id} data-dir="up" className="pointer" name='arrow up' size='large' color={upColor}/>
                  </Grid.Row>
                  {/* Vote count */}
                  <Grid.Row centered={true}><p style={numStyle}>{post.voteCount}</p></Grid.Row>
                  <Grid.Row centered={true}>
                    <Icon onClick={this.handleVoteClick} data-id={post._id} data-dir="down" className="pointer" name='arrow down' size='large' color={downColor}/>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
        
              <Grid.Column width={1} verticalAlign='middle'>
                {post.type === 'video' ?
                    <a href={post.url}><Icon name='video' size='big'/></a>
                    :
                    post.type === 'image' ?
                    <a href={post.url}><Icon name='picture' size='big'/></a>
                      :
                      post.type === 'text' ?
                      <a href={post.url}><Icon name='file text outline' size='big'/></a>
                        :
                        <a href={post.url}><Icon name='linkify' size='big'/></a> 
                        
                }
              </Grid.Column>

              <Grid.Column width={13}>
                <Grid>
                  {/* post title */}
                  <Grid.Row><a href={post.url}>{post.title}</a></Grid.Row>
                  {/* post info */}
                  <Grid.Row>comment(s) submitted {Moment().startOf('hour').fromNow()} ago by {post.authorName} to {post.subredditName}</Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )
      })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.authReducer.user };
};

export default connect(mapStateToProps, null)(Content);

/*
post order number,

upvote arrow(changes upon click),
total vote count(changes upon click),
downvote arrow(changes upon click),

title(linked to either the post on reddit),
submitted 'timestamp' ago by 'username' to 'sr'


*/