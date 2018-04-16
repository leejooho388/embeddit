import React, { Component } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import Moment from 'moment';
import CommentInputBox from './CommentInputBox.jsx';
import { connect } from 'react-redux';
import Comment from './Comment.jsx';
import axios from 'axios';

class PostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //posts will be an array
      post: {
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
  }

  getPostById() {
    // let params = {id: this.props.match.params.postId};
    axios.get(`/api/post/${this.props.match.params.postId}`)
      .then( res => {
        // console.log('Post Page Response: ', res.data[0]);
        let currPost = res.data[0];
        currPost.type === 'text' ?
        this.setState({
          post: {
            _id: currPost._id,
            authorName: currPost.authorName,
            subredditName: currPost.subredditName,
            title: currPost.title,
            voteCount: currPost.voteCount,
            type: currPost.type,
            text: currPost.text,
            updatedAt: currPost.updatedAt
          }
        })
        :
        this.setState({
          post: {
            _id: currPost._id,
            authorName: currPost.authorName,
            subredditName: currPost.subredditName,
            title: currPost.title,
            voteCount: currPost.voteCount,
            type: currPost.type,
            url: currPost.url,
            updatedAt: currPost.updatedAt
          }
        })
      })
      .catch( err => {
        console.log('could not get current post', err);
      })
  }

  componentDidMount() {
    this.getPostById()
  }
  
  render() {
    const renderCommentInputBox = this.props.authenticated ? 
      <CommentInputBox parentType='100' parentId={this.state.post._id}/>
      :
      (<div className='unAuthCommentInputBox'>
          <h3>Want to add to the discussion?</h3>
          <h3>CREATE AN ACCOUNT!</h3>
      </div>);

    return (
      <div>
        <Grid>
            <Grid.Row id='post-page-block'>
              <Grid.Column width={1} floated='left'>
                <Grid celled='internally'>
                  <Grid.Row centered={true}>
                    <Icon name='arrow up' size='large' color='grey'/> 
                  </Grid.Row>
                  {/* Vote count */}
                  <Grid.Row centered={true}>{this.state.post.voteCount}</Grid.Row>
                  <Grid.Row centered={true}>
                    <Icon name='arrow down' size='large' color='grey'/>
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
                  <Grid.Row>comment(s) submitted {Moment().startOf('hour').fromNow()} ago by {this.state.post.authorName} to {this.state.post.subredditName}</Grid.Row>
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
          <Comment />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // need to also map the newest post here
  return { authenticated: state.authReducer.authenticated };
}

export default connect(mapStateToProps, null)(PostPage);