import React, { Component } from "react";
import { Form, Button } from 'semantic-ui-react';

class CommentInputBox extends Component {
  constructor(props) {
    super(props),
    this.state = {
      // parentType: // post = 0, comment = 1
      // parentId: //post or comment _id
      text: ''
      // voteCount: 0,
      // author: {
      //   authorId: //user._id
      //   name: //username
      }
      this.handleOnChange = this.handleOnChange.bind(this);
    }

  handleOnChange(e) {
    this.setState({text: e.target.value});
    console.log(this.state.text);
  }


  render() {
    return(
      <Form id='commentInputBox'>
        <Form.Field width='7'>
          <div style={{color: 'rgb(182, 49, 52)'}}>Don't just complain, please MESSAGE THE MODS regarding rule violations</div>
          <Form.TextArea rows='4' onChange={this.handleOnChange}/>
          <Button basic size='mini' color='grey'>save</Button>
        </Form.Field>
      </Form>
    )
  }
}

export default CommentInputBox;
