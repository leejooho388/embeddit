import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import Moment from 'moment';

const Comments = () => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={1} floated='left'>
        <Grid celled='internally'>
          <Grid.Row centered={true}>
            <Icon name='arrow up' size='large' color='grey'/> 
          </Grid.Row>
          <Grid.Row centered={true}>
            <Icon name='arrow down' size='large' color='grey'/>
          </Grid.Row>
        </Grid>
      </Grid.Column>

      <Grid.Column width={15}>
        <Grid.Row>
            {/* toggle between the two */}
          <Icon name='minus square outline' size='small' color='grey'/> 
          <Icon name='plus square outline' size='small' color='grey'/> 
          {/* apply moment here */}
          3 hours ago
        </Grid.Row>

        {/* comment */}
        <Grid.Row>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        </Grid.Row>
      </Grid.Column>
    </Grid.Row>
  </Grid>  
)

export default Comments;