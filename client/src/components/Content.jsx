import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Grid } from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';

import handlePostVote from '../../utils/postVoteUtils';
import renderVoteHelper from '../../utils/renderVotesUtils';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      currentQuery: '',
    }
    this.getPosts = this.getPosts.bind(this);
    this.handleVoteClick = this.handleVoteClick.bind(this);
  }

  getPosts(userId) {
    axios.get(`/api/posts/${userId}`)
      .then( response => {
        this.setState({posts: response.data})
      })
      .catch( err => {
        console.error('Unable to fetch posts data.');
      });
  }

  componentDidMount() {
    if (this.props.authenticated) {
      this.getPosts(this.props.user._id);
    } else {
      this.getPosts();
    }
  }

  componentDidUpdate(){
    if(this.props.match.params.query === undefined && this.state.currentQuery !== this.props.match.params.query){
      this.componentDidMount();
      this.setState({currentQuery: this.props.match.params.query})
    } else if(this.state.currentQuery !== this.props.match.params.query){
      this.setState({currentQuery: this.props.match.params.query})
      axios.get(`/api/r/${this.props.match.params.query}`)
        .then( response => {
          this.setState({posts: response.data})
        })
        .catch( err => {
          console.error('Unable to fetch posts data.');
        });
    }
  }

  handleVoteClick(e) {

    if (!this.props.authenticated) {
      alert('You must be logged in to vote');
      return;
    }

    const id = e.target.getAttribute('data-id');
    const vote = e.target.getAttribute('data-dir');
    let post_i;
    let i;

    for (i = 0; i < this.state.posts.length; i++) {
      post_i = this.state.posts[i];
      if (post_i._id === id) {
        break;
      }
    }

    handlePostVote(this, post_i, i, vote, true);

  }

  render() {

    return (
      <div>
      {this.state.posts.map( (post, i) => {

        const voteStyle = renderVoteHelper(this, post, false, this.props.authenticated);

        return (
          <Grid key={post._id}>
            <Grid.Row>
              <Grid.Column width={1} verticalAlign='middle' textAlign='center' floated='left'>
              {/* post count */}
                <Grid.Row centered={true}><p id="postNum">{i + 1}</p></Grid.Row>
              </Grid.Column>
        
              <Grid.Column width={1} floated='left'>
                <Grid celled='internally'>
                  <Grid.Row centered={true}>
                    <Icon onClick={this.handleVoteClick} data-id={post._id} data-dir="up" className="pointer" name='arrow up' size='large' color={voteStyle.upColor}/>
                  </Grid.Row>
                  {/* Vote count */}
                  <Grid.Row centered={true}><p style={voteStyle.numStyle}>{post.voteCount}</p></Grid.Row>
                  <Grid.Row centered={true}>
                    <Icon onClick={this.handleVoteClick} data-id={post._id} data-dir="down" className="pointer" name='arrow down' size='large' color={voteStyle.downColor}/>
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
                  <Grid.Row>comment(s) submitted {moment(post.createdAt).fromNow()} ago by {post.authorName} to {post.subredditName}</Grid.Row>
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

const mapStateToProps = (state) => {
  return { authenticated: state.authReducer.authenticated, user: state.authReducer.user };
};

export default connect(mapStateToProps, null)(Content);

/*
post order number,

upvote arrow(changes upon click),
total vote count(changes upon click),
downvote arrow(changes upon click),

title(linked to either the post on reddit),
submitted 'timestamp' ago by 'username' to 'sr'


*/