import React, { Component } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import moment from 'moment';
import CommentInputBox from './CommentInputBox.jsx';
import { connect } from 'react-redux';
import Comment from './Comment.jsx';
import axios from 'axios';

import handlePostVote from '../../utils/postVoteUtils';
import renderVoteHelper from '../../utils/renderVotesUtils';

class PostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //posts will be an array
      post: {
        _id: '',
        authorName: 'dlai',
        subredditName: 'videos',
        title: 'YouTube has officially changed the URL of Rick Atley\'s "Never Gonna Give You Up" to include "gIveyouUP"',
        voteCount: 0,
        type: 'url',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        voteHistoryUser: {},
      }
    };
    this.getPostById = this.getPostById.bind(this);
    this.getCommentsAfterPosting = this.getCommentsAfterPosting.bind(this);
    this.handlePostVoteClick = this.handlePostVoteClick.bind(this);
    this.handleSubredditClick = this.handleSubredditClick.bind(this);
  }

  getPostById() {
    axios.get(`/api/post/${this.props.match.params.postId}`)
      .then( res => {
        this.setState({
          post: res.data
        });
      })
      .catch( err => {
        console.log('could not get current post', err);
      })
  }

  getCommentsAfterPosting(currComments) {
    this.setState({comments: currComments})
  }

  componentDidMount() {
    this.getPostById();
    axios.get(`/api/comments/0/${this.props.match.params.postId}`)
      .then( res => {
        this.setState({
          comments: res.data
        })
      })
      .catch( err => {
        console.log('Error on fetching comments')
      })
  }

  handlePostVoteClick(e) {
    if (!this.props.authenticated) {
      alert('You must be logged in to vote');
      return;
    }
    const vote = e.target.getAttribute('data-dir');
    handlePostVote(this, this.state.post, null, vote, false);
  }

  handleSubredditClick(post) {
    let srname = post.subredditName;
    console.log(srname);
    this.props.history.push(`/r/${srname}`);
  }
  
  render() {

    const voteStyle = renderVoteHelper(this, this.state.post);

    const renderCommentInputBox = this.props.authenticated ? 
      <CommentInputBox parentType={0} parentId={this.props.match.params.postId} getCommentsAfterPosting={this.getCommentsAfterPosting}/>
      :
      (<div className='unAuthCommentInputBox'>
          <h3>Want to add to the discussion?</h3>
          <h3>CREATE AN ACCOUNT!</h3>
      </div>);

    const renderComments = this.state.comments ?
    (this.state.comments.map( individualComment => {
      return <Comment key={individualComment._id} commentObj={individualComment} authenticated={this.props.authenticated} userId={this.props.user._id} />
    }))
    :
    <div><h2>No Comments</h2></div>

    return (
      <div className='post-feed-box'>
        <Grid>
            <Grid.Row id='post-page-block'>
              <Grid.Column width={1} floated='left'>
                <Grid celled='internally'>
                  <Grid.Row centered={true}>
                    <Icon onClick={this.handlePostVoteClick} className="pointer" name='arrow up' data-id={this.state.post._id} data-dir="up" size='large' color={voteStyle.upColor}/>
                  </Grid.Row>
                  {/* Vote count */}
                  <Grid.Row centered={true}><p style={voteStyle.numStyle}>{this.state.post.voteCount}</p></Grid.Row>
                  <Grid.Row centered={true}>
                    <Icon onClick={this.handlePostVoteClick} className="pointer" name='arrow down' data-id={this.state.post._id} data-dir="down" size='large' color={voteStyle.downColor}/>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
        
              <Grid.Column width={1} verticalAlign='middle'>
                {this.state.post.type === 'video' ?
                    <a href={this.state.post.url}><Icon name='video' size='big'/></a>
                    :
                    this.state.post.type === 'image' ?
                    <a href={this.state.post.url}><Icon name='picture' size='big'/></a>
                      :
                      this.state.post.type === 'text' ?
                      <a href={this.state.post.url}><Icon name='file text outline' size='big'/></a>
                        :
                        <a href={this.state.post.url}><Icon name='linkify' size='big'/></a>
                }
              </Grid.Column>

              <Grid.Column width={13}>
                <Grid>
                  {/* post title */}
                  <Grid.Row><a href={this.state.post.url}>{this.state.post.title}</a></Grid.Row>
                  <Grid.Row>{this.state.post.type === 'text' ? this.state.post.text : this.state.url}</Grid.Row>
                  {/* post info */}
                  <Grid.Row className='content-feed'>
                    <span>submitted {moment(this.state.post.createdAt).fromNow()} by&nbsp;</span>
                    <span className='content-feed-username'>{this.state.post.authorName}</span>
                    <span>&nbsp;to&nbsp;</span>
                    <span className='hover-underline content-feed-srname' onClick={() => this.handleSubredditClick(this.state.post)}>r/{this.state.post.subredditName}</span>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column width={1}>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <br></br>
          <br></br>
          {renderCommentInputBox}
          <br></br>
          <br></br>
          {/* Comments will go here */}
          {renderComments}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // need to also map the newest post here
  return { authenticated: state.authReducer.authenticated, user: state.authReducer.user };
}

export default connect(mapStateToProps, null)(PostPage);