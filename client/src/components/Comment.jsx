import React, { Component } from "react";
import { Grid, Icon } from "semantic-ui-react";
import moment from "moment";
import CommentInputBox from './CommentInputBox.jsx';
import axios from 'axios';

import handleCommentVote from "../../utils/commentVoteUtils";
import renderVoteHelper from '../../utils/renderVotesUtils';

class Comments extends Component {
  constructor(props) {
    super(props),
    this.state = {
      shown: true,
      showCommentBox: false,
      comment: props.commentObj,
      childComments: []
    }
    this.toggleComment = this.toggleComment.bind(this);
    this.handleReplyClick = this.handleReplyClick.bind(this);
    this.cancelReplyClick = this.cancelReplyClick.bind(this);
    this.getCommentAfterPosting = this.getCommentAfterPosting.bind(this);
    this.handleCommentVoteClick = this.handleCommentVoteClick.bind(this);
  }

  toggleComment() {
    this.setState({
      shown: !this.state.shown,
    })
  }
  
  handleReplyClick() {
    this.setState({
      showCommentBox: true
    })
  }
  
  cancelReplyClick() {
    this.setState({
      showCommentBox: false
    })
  }
  getCommentAfterPosting(currComments) {
    this.setState({
      childComments: currComments,
      showCommentBox: false
    })
  }

  componentDidMount() {
    axios.get(`/api/comments/1/${this.state.comment._id}`)
      .then( res => {
        this.setState({
          childComments: res.data
        })
      })
      .catch( err => {
        console.log('Error on fetching comments')
      })
  }

  handleCommentVoteClick(e) {
    if (!this.props.authenticated) {
      alert('You must be logged in to vote');
      return;
    }

    // this.state.comment.author.authorId

    const vote = e.target.getAttribute('data-dir');
    handleCommentVote(this, this.state.comment, this.props.userId, vote);
  }

  render() {

    const voteStyle = renderVoteHelper(this, this.state.comment, true, this.props.authenticated);

    let renderPoints = this.state.comment.voteCount;

    renderPoints += renderPoints === 1 ? ' point' : ' points';

    return (
      <Grid>
        {this.state.shown ? 
        <Grid.Row>
          <Grid.Column width={1} floated="left">
            <Grid celled="internally">
              <Grid.Row centered={true}>
                <Icon onClick={this.handleCommentVoteClick} className='pointer' name="arrow up" data-id={this.state.comment._id} data-dir="up" size="large" color={voteStyle.upColor} />
              </Grid.Row>
              <Grid.Row centered={true}>
                <Icon onClick={this.handleCommentVoteClick} className='pointer' name="arrow down" data-id={this.state.comment._id} data-dir="down" size="large" color={voteStyle.downColor} />
              </Grid.Row>
            </Grid>
          </Grid.Column>

          <Grid.Column width={15}>
            <Grid.Row>
              <Icon className='pointer' name="minus square outline" color="grey" onClick={this.toggleComment} onMouseOver={this.handleMouseOver} />
              <span><b>{this.state.comment.author.name}</b></span>
              <span> {renderPoints} </span>
              <span style={{'color': 'gray'}}> {moment(this.state.comment.createdAt).fromNow()} </span>
              <span className='commentReply' onClick={this.handleReplyClick}>reply</span>
            </Grid.Row>

            {/* comment */}
            <Grid.Row>
              {this.state.comment.text}
              <div>
                {this.state.showCommentBox ?
                  <CommentInputBox parentType={1} parentId={this.state.comment._id} getCommentAfterPosting={this.getCommentAfterPosting} hide={this.cancelReplyClick} />
                  : 
                  <div />
                }
              </div>
              <br></br>
              {/* child comments */}
              <div className='comment-left-dash'>
                {this.state.childComments.length ?
                  this.state.childComments.map(childComment => {
                    return <Comments key={childComment._id} commentObj={childComment} authenticated={this.props.authenticated} userId={this.props.userId} />
                  })
                  :
                  <div />
                }
              </div>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
        :
        <Grid.Row>
          <Grid.Column width={1} floated="left">
          </Grid.Column>

          <Grid.Column width={15}>
            <Grid.Row className='hiddenComments'>
            <Icon className='pointer' name="plus square outline" color="grey" onClick={this.toggleComment} />
              <span className='comment-username'>{this.state.comment.author.name}</span> <span>{moment(this.state.comment.createdAt).fromNow()}</span>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
        }
      </Grid>
    );
  }
}

export default Comments;
