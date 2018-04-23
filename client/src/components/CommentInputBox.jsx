import React, { Component } from "react";
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';

class CommentInputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parentType: props.parentType,// post = 0, comment = 1
      parentId: props.parentId,//post or comment _id
      text: '',
      voteCount: 0,
      author: {
        authorId: '',//user._id
        name: ''//username
      }
    }
      this.handleOnChange = this.handleOnChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  handleOnChange(e) {
    this.setState({text: e.target.value});
  }
  
  handleSubmit() {
    let user = this.props.user.authReducer.user;
    this.state.text !== '' ?
    this.setState({
      author: {
        authorId: user._id,
        name: user.username
      }
    }, () => {
      let newComment = Object.assign({}, this.state);
      axios.post('http://localhost:8080/api/comments', newComment)
      .then( res => {
          this.setState({
            text: '',
            author: {},
            alert: false
          }),
          axios.get(`/api/comments/${this.props.parentType}/${this.props.parentId}`)
            .then( res => {
              this.props.parentType === 0 ?
                this.props.getCommentsAfterPosting(res.data)
                :
                this.props.getCommentAfterPosting(res.data)
            })
            .catch( err => {
              console.log('Error on fetching comments')
            })
        })
        .catch( err => {
          console.log('Error on comment posting', err);
        })
    })
    :
    this.setState({
      alert: true
    })
  }
  
  render() {
    const renderAlert = this.state.alert ?
    <div className='commentInputBox-alert'>we need something here</div>
    :
    <div />

    return(
      <Form className='commentInputBox'>
        <Form.Field width='7'>
          <div style={{color: 'rgb(182, 49, 52)'}}>Don't just complain, please MESSAGE THE MODS regarding rule violations</div>
          <Form.TextArea rows='4' onChange={this.handleOnChange} value={this.state.text}/>
          {renderAlert}
          <Button basic size='mini' color='grey' onClick={this.handleSubmit}>save</Button>
          {this.props.parentType === 1 && <Button basic size='mini' color='grey' onClick={() => { this.props.hide() }}>cancel</Button>}
        </Form.Field>
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state
})

export default connect(mapStateToProps)(CommentInputBox);
