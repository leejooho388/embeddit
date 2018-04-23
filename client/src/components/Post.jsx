import React, { Component } from 'react';
import axios from 'axios';
import { Tab, Form, Message, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import config from '../../../config.js';

const mapStateToProps = (state) => ({
  user: state
})

export default connect (mapStateToProps)( class Post extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      panes: [],
      subredditName: '',
      type: '',
      url: '',
      media: '',
      title: '',
      text: '',
      activeIndex: '1',
      redirect: (<div />)
    }
  }

  componentDidMount() {
    this.props.history.listen( ()=> {
      console.log(this.props.location.query);
      this.setState({activeIndex: this.props.location.query === 'link' ? '0' : '1'}, () => {
        this.forceUpdate();
      })

    })
    let _panes = [];
    let link = this.linkView();
    let textView = this.textView();
    _panes.push(link, textView);
    this.setState({
      panes: _panes,
    })
    setTimeout(() => {
      window.grecaptcha.render('recaptcha-this', {
      sitekey: '6LeWEFUUAAAAAAt9mIWYpgFM0OE1Z6Qgj-eewtA-',
      callback: this.recaptchaCallback
      })
    },0);
  }

  recaptchaCallback(response) {
    console.log('recaptcha response: ', response);
    axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${config.SECRET_KEY}&response=${response}`, {}, {
      headers: {
        'Access-Control-Allow-Origin': '*' 
      }
    })
    .then(res => {
      console.log('recaptcha response: ', res);
    })
    .catch(err => {
      console.log('error in recaptcha: ', err);
    });
  }

  handleSubmit() {
    const _this = this;
    let newPost = Object.assign({}, this.state);
    delete newPost.panes;
    delete newPost.redirect;
    let username = this.props.user.authReducer.user.username;
    newPost.authorName = username;
    newPost.voteCount = 0;
    for (let key in newPost) {
      (newPost[key] === '') && delete newPost[key]
    }
    axios.post('http://localhost:8080/api/post', newPost)
    .then( res => {
      _this.setState({
        subredditName: '',
        url: '',
        title: '',
        text: '',
      });
      axios.get('http://localhost:8080/api/post/user/newest', username)
        .then( res => {
          let postId = res.data[0]._id;
          let srName = res.data[0].subredditName;
          this.setState({ redirect: (<Redirect to={`/comments/${srName}/${postId}`}/>)});
        })
        .catch( err => {
          console.log('error in fetching post', err);
        });
    })
    .catch( err => {
      console.log('error in post', err);
    });
  }

  onChange(e) {
    let stateId = e.target.id;
    stateId === "postTitle" && (stateId = "title")
    this.setState({
      [stateId]: e.target.value
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

  handleTabChange(e, {activeIndex}) {
    
    this.setState({activeIndex});
  }

  linkView() {
    return (
      {
        menuItem: 'link', 
        render: () => <Tab.Pane attached={false}>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Message color='yellow' content='You are submitting a link. The key to a successful submission is interesting content and a descriptive title.'/>
            <Form.Field className='postFields'>
              <Form.Input id='url' label='url' placeholder="url here" onChange={this.onChange.bind(this)} value={this.state.url}/>
            </Form.Field>
            <Form.Field className='postFields'> 
              <Form.TextArea id='postTitle' label='title' onChange={this.onChange.bind(this)} value={this.state.title}/>
            </Form.Field>
            <Form.Field className='postFields'>
              <Form.Input id='subredditName' label='subreddit' placeholder="subreddit to post to" onChange={this.onChange.bind(this)} value={this.state.sub}/>
            </Form.Field>
            <div className="g-recaptcha" id="recaptcha-this" data-sitekey="6LeWEFUUAAAAAAt9mIWYpgFM0OE1Z6Qgj-eewtA-"></div> <br/>
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
              <Message color='yellow' content='You are submitting a text-based post. Speak your mind. A title is required, but expanding further in the text field is not. Beginning your title with "vote up if" is violation of intergalactic law.'/>
            <Form.Field className='postFields'> 
              <Form.TextArea id='postTitle' label='title' onChange={this.onChange.bind(this)} value={this.state.title}/>
            </Form.Field>
            <Form.Field className='postFields'> 
              <Form.TextArea id='text' label='text (optional)' onChange={this.onChange.bind(this)} value={this.state.text}/>
            </Form.Field>
            <Form.Field className='postFields'>
              <Form.Input id='subredditName' label='subreddit' placeholder="subreddit to post to" onChange={this.onChange.bind(this)} value={this.state.sub}/>
            </Form.Field>
            <div className="g-recaptcha" id="recaptcha-this" data-sitekey="6LeWEFUUAAAAAAt9mIWYpgFM0OE1Z6Qgj-eewtA-"></div> <br/>
            <Button type='submit'>Submit</Button>
          </Form>
        </Tab.Pane>
      }
    )
  }

  render() {
    
    //let query = this.props.location.query === 'link' ? '0' : '1';
    
    return (
      <div id="post">
        <h3>submit to reddit</h3>
        <Tab menu={{ secondary: true}} activeIndex={this.state.activeIndex} panes={this.state.panes} onTabChange={this.handleTabChange.bind(this)}/>
        {this.state.redirect}
      </div>
    );
  }
})