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
            author: {}
          });
          console.log('Success on comment posting')
        })
        .catch( err => {
          console.log('Error on comment posting', err);
        })
    })
  }
  
  render() {
    return(
      <Form id='commentInputBox'>
        <Form.Field width='7'>
          <div style={{color: 'rgb(182, 49, 52)'}}>Don't just complain, please MESSAGE THE MODS regarding rule violations</div>
          <Form.TextArea rows='4' onChange={this.handleOnChange} value={this.state.text}/>
          <Button basic size='mini' color='grey' onClick={this.handleSubmit}>save</Button>
        </Form.Field>
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state
})

export default connect(mapStateToProps)(CommentInputBox);
