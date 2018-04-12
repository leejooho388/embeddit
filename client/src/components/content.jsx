import React, { Component } from 'react';
import { Icon, Grid } from 'semantic-ui-react';
import data from '../../../exampleData/examplePosts.js';

class Content extends Component {
  constructor(props) {
    super(props),
    this.state = {
      //posts will be an array
      posts: data.examplePosts
    }
  }

  render() {
    return(
      <div>
      {this.state.posts.map((post, i) => {
        return (
          <Grid key={i}>
            <Grid.Row>
              <Grid.Column width={1} verticalAlign='middle' textAlign='center'>
              {/* post count */}
                {i + 1}
              </Grid.Column>
        
              <Grid.Column width={1}>
                <Grid celled='internally'>
                  <Grid.Row centered={true}>
                    <Icon name='arrow up' size='large' color='grey'/> 
                  </Grid.Row>
                  {/* Vote count */}
                  <Grid.Row centered={true}>{post.voteCount}</Grid.Row>
                  <Grid.Row centered={true}>
                    <Icon name='arrow down' size='large' color='grey'/>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
        
              <Grid.Column width={1} verticalAlign='middle'>
                {post.type === 'video' ?
                    <Icon name='video' size='big'/>
                    :
                    post.type === 'image' ?
                      <Icon name='picture' size='big'/>
                      :
                      post.type === 'text' ?
                        <Icon name='file text outline' size='big'/> 
                        :
                        <Icon name='linkify' size='big'/> 
                        
                }
              </Grid.Column>

              <Grid.Column width={13}>
                <Grid>
                  {/* post title */}
                  <Grid.Row>{post.title}</Grid.Row>
                  {/* post info */}
                  <Grid.Row>comment(s) submitted 'blank hours' ago by {post.authorName} to {post.subredditName}</Grid.Row>
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