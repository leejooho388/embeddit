import React from 'react';
import { Icon, Grid } from 'semantic-ui-react';

const Content = () => (
  <Grid>
    <Grid.Row textAlign='center'>
      <Grid.Column width={1} verticalAlign='middle'>
      {/* post count */}
        1
      </Grid.Column>

      <Grid.Column width={1}>
        <Grid celled='internally'>
          <Grid.Row>
            <Icon name='arrow up' size='big'/> 
          </Grid.Row>
          {/* Vote count */}
          <Grid.Row centered='true'>123456</Grid.Row>
          <Grid.Row>
            <Icon name='arrow down' size='big'/>
          </Grid.Row>
        </Grid>
      </Grid.Column>

      <Grid.Column width={14}>
        <Grid>
          {/* post title */}
          <Grid.Row>YouTube has officially changed the URL of Rick Atley's "Never Gonna Give You Up" to include "gIveyouUP"</Grid.Row>
          {/* post info */}
          <Grid.Row>submitted 'blank hours' ago by 'username'</Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default Content;

/*
post order number,

upvote arrow(changes upon click),
total vote count(changes upon click),
downvote arrow(changes upon click),

title(linked to either the post on reddit),
submitted 'timestamp' ago by 'username' to 'sr'


*/