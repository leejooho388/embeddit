import React, { Component } from 'react';

import { Tab, Form, Message, Button } from 'semantic-ui-react'

export default class Post extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      panes: [],
    }
  }
  
  componentDidMount() {
    let _panes = [];
    let link=this.linkView()
    let textView= this.textView();
    _panes.push(link, textView);
    this.setState({
      panes: _panes
    })
  }

  linkView() {
    return (
      {
        menuItem: 'link', 
        render: () => <Tab.Pane attached={false}>
          <Form>
            <Form.Field width='5'><Message content='You are submitting a link. The key to a successful submission is interesting content and a descriptive title.'/></Form.Field>
            <Form.Field width='5'>
              <Form.Input label='url' placeholder="url here"/>
            </Form.Field>
            <Form.Field width='5'>
              <Form.Input label='image/video'placeholder="Have image/video go here"/>
            </Form.Field>
            <Form.Field width='5'> 
              <Form.TextArea label='title'/>
            </Form.Field>
            <Form.Field width='5'>
              <Form.Input label='subreddit' placeholder="subreddit to post to"/>
            </Form.Field>
            <Button>Submit</Button>
          </Form>
        </Tab.Pane>
      }
    )
  }

  textView() {
    return (
      {
        menuItem: 'text', 
        render: () => <Tab.Pane attached={false}>
          <Form>
            <Form.Field width='5'>
              <Message content='You are submitting a text-based post. Speak your mind. A title is required, but expanding further in the text field is not. Beginning your title with "vote up if" is violation of intergalactic law.'/>
            </Form.Field>
            <Form.Field width='5'> 
              <Form.TextArea label='title'/>
            </Form.Field>
            <Form.Field width='5'> 
              <Form.TextArea label='text (optional)'/>
            </Form.Field>
            <Form.Field width='5'>
              <Form.Input label='subreddit' placeholder="subreddit to post to"/>
            </Form.Field>
            <Button>Submit</Button>
          </Form>
        </Tab.Pane>
      }
    )
  }

  render() {
    
    return (
      <div id="postTab">
        {/* {this.props.children} */}
        <h3>submit to reddit</h3>
        <Tab menu={{ secondary: true}} panes={this.state.panes}/>
      </div>
    );
  }
}