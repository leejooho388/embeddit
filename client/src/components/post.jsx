import React, { Component } from 'react';
import axios from 'axios';
import { Tab, Form, Message, Button } from 'semantic-ui-react';
import Captcha from '../../../config.js';
export default class Post extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      panes: [],
      authorName: 'TeamBackbone',
      subredditName: '',
      type: '',
      url: '',
      media: '',
      title: '',
      text: '',
    }
  }
  
  componentDidMount() {
    console.log(Captcha.SITE_KEY)
    let _panes = [];
    let link=this.linkView()
    let textView= this.textView();
    _panes.push(link, textView);
    this.setState({
      panes: _panes
    })
  }

  handleSubmit() {
    const _this = this;
    let newPost = Object.assign({}, this.state);
    delete newPost.panes;
    newPost.voteCount = 0;
    for (let key in newPost) {
      (newPost[key] === '') && delete newPost[key]
    }
    console.log(newPost)
    axios.post('http://localhost:8080/api/post', newPost)
    .then(function(res) {
      _this.setState({
        subredditName: '',
        url: '',
        title: '',
        text: '',
      })
    })
    .catch(function(err) {
      console.log('error in post', err);
    });
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
   if (e.target.id === 'text') {
     this.setState({
       type: 'text'
     })
    } else if (e.target.id === 'url') {
      this.setState({
        type: 'url'
      }) 
    } 
  }

  linkView() {
    return (
      {
        menuItem: 'link', 
        render: () => <Tab.Pane attached={false}>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Form.Field><Message content='You are submitting a link. The key to a successful submission is interesting content and a descriptive title.'/></Form.Field>
            <Form.Field>
              <Form.Input id='url' label='url' placeholder="url here" onChange={this.onChange.bind(this)} value={this.state.url}/>
            </Form.Field>
            <Form.Field> 
              <Form.TextArea id='title' label='title' onChange={this.onChange.bind(this)} value={this.state.title}/>
            </Form.Field>
            <Form.Field>
              <Form.Input id='subredditName' label='subreddit' placeholder="subreddit to post to" onChange={this.onChange.bind(this)} value={this.state.sub}/>
            </Form.Field>
            <div className="g-recaptcha" data-siteKey={Captcha.SITE_KEY}></div> <br/>
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
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Form.Field>
              <Message content='You are submitting a text-based post. Speak your mind. A title is required, but expanding further in the text field is not. Beginning your title with "vote up if" is violation of intergalactic law.'/>
            </Form.Field>
            <Form.Field> 
              <Form.TextArea id='title' label='title' onChange={this.onChange.bind(this)} value={this.state.title}/>
            </Form.Field>
            <Form.Field> 
              <Form.TextArea id='text' label='text (optional)' onChange={this.onChange.bind(this)} value={this.state.text}/>
            </Form.Field>
            <Form.Field>
              <Form.Input id='subredditName' label='subreddit' placeholder="subreddit to post to" onChange={this.onChange.bind(this)} value={this.state.sub}/>
            </Form.Field>
            <div className="g-recaptcha" data-siteKey={Captcha.SITE_KEY}></div> <br/>
            <Button type='submit'>Submit</Button>
          </Form>
        </Tab.Pane>
      }
    )
  }

  render() {
    
    let query = this.props.query === 'link' ? '0' : '1';

    return (
      <div id="post">
        {/* {this.props.children} */}
        <h3>submit to reddit</h3>
        <Tab menu={{ secondary: true}} defaultActiveIndex={query} panes={this.state.panes}/>
      </div>
    );
  }
}