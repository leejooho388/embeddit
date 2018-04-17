import React, { Component } from "react";
import { Grid, Icon } from "semantic-ui-react";
import moment from "moment";
import CommentInputBox from './CommentInputBox.jsx';
import axios from 'axios';

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
    console.log('clicked');
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

  render() {
    return (
      <Grid>
        {this.state.shown ? 
        <Grid.Row>
          <Grid.Column width={1} floated="left">
            <Grid celled="internally">
              <Grid.Row centered={true}>
                <Icon className='pointer' name="arrow up" size="large" color="grey" />
              </Grid.Row>
              <Grid.Row centered={true}>
                <Icon className='pointer' name="arrow down" size="large" color="grey" />
              </Grid.Row>
            </Grid>
          </Grid.Column>

          <Grid.Column width={15}>
            <Grid.Row>
              <Icon className='pointer' name="minus square outline" color="grey" onClick={this.toggleComment} onMouseOver={this.handleMouseOver} />
              <span className='bold'>{this.state.comment.author.name}</span> <span>{moment(this.state.comment.createdAt).fromNow()}</span> <span className='commentReply' onClick={this.handleReplyClick}>reply</span>
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
              {/* child comments */}
              <div>
                {this.state.childComments.length ?
                  this.state.childComments.map(childComment => {
                    return <Comments key={childComment._id} commentObj={childComment} />
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
            <Grid.Row>
            <Icon className='pointer' name="plus square outline" color="grey" onClick={this.toggleComment} />
              <span className='bold hiddenComments'>{this.state.comment.author.name}</span> <span className='hiddenComments'>{moment(this.state.comment.createdAt).fromNow()}</span>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
        }
      </Grid>
    );
  }
}

export default Comments;
