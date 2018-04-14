import React, { Component } from 'react';
import { Icon, Grid } from 'semantic-ui-react';
import axios from 'axios';
import Moment from 'moment';


class Content extends Component {
  constructor(props) {
    super(props),
    this.state = {
      //posts will be an array
      posts: []
    }
    this.getPosts = this.getPosts.bind(this);
    this.voteOnPost = this.voteOnPost.bind(this);
  }

  getPosts() {
    axios.get('/api/post')
      .then( response => {
        this.setState({posts: response.data})
      })
      .catch( err => {
        console.error('Unable to fetch posts data.');
      });
  }

  componentDidMount() {
    this.getPosts();
  }

  voteOnPost(e) {

    // if post is already upvoted and vote is up, unvote
    // if post is already upvoted and vote is down, switch vote to down

    // if post is already downvoted and vote is down, unvote
    // if post is already downvoted and vote is up, switch vote to up
    

    // if (e.target.getAttribute('data-dir') === 'up') {
    //   this.voteOnPost('up', e.target.getAttribute('data-id'))
    // } else if (e.target.getAttribute('data-dir') === 'down') {
    //   this.voteOnPost('down', e.target.getAttribute('data-id'))
    // }
  }

  render() {
    return(
      <div>
      {this.state.posts.map( post => {
        return (
          <Grid key={post._id}>
            <Grid.Row>
              <Grid.Column width={1} verticalAlign='middle' textAlign='center' floated='left'>
              {/* post count */}
                {/* TODO in future {i + 1} */}
              </Grid.Column>
        
              <Grid.Column width={1} floated='left'>
                <Grid celled='internally'>
                  <Grid.Row centered={true}>
                    <Icon onClick={this.voteOnPost} data-id={post._id} data-dir="up" className="pointer" name='arrow up' size='large' color='grey'/>
                  </Grid.Row>
                  {/* Vote count */}
                  <Grid.Row centered={true}>{post.voteCount}</Grid.Row>
                  <Grid.Row centered={true}>
                    <Icon onClick={this.voteOnPost} data-id={post._id} data-dir="down" className="pointer" name='arrow down' size='large' color='grey'/>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
        
              <Grid.Column width={1} verticalAlign='middle'>
                {post.type === 'video' ?
                    <a href={post.url}><Icon name='video' size='big'/></a>
                    :
                    post.type === 'image' ?
                    <a href={post.url}><Icon name='picture' size='big'/></a>
                      :
                      post.type === 'text' ?
                      <a href={post.url}><Icon name='file text outline' size='big'/></a>
                        :
                        <a href={post.url}><Icon name='linkify' size='big'/></a> 
                        
                }
              </Grid.Column>

              <Grid.Column width={13}>
                <Grid>
                  {/* post title */}
                  <Grid.Row><a href={post.url}>{post.title}</a></Grid.Row>
                  {/* post info */}
                  <Grid.Row>comment(s) submitted {Moment().startOf('hour').fromNow()} ago by {post.authorName} to {post.subredditName}</Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )
      })}
      </div>
    );
  }
}

export default Content;

/*
post order number,

upvote arrow(changes upon click),
total vote count(changes upon click),
downvote arrow(changes upon click),

title(linked to either the post on reddit),
submitted 'timestamp' ago by 'username' to 'sr'


*/