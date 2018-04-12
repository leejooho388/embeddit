import React from 'react'
import { Feed, Icon } from 'semantic-ui-react'

const Content = () => (
  <Feed>
    <Feed.Event> 1
      <Feed.Label>
        {/* <img src='./../../upvoteArrow.png'/> */}
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.Date>submitted 1 Hour Ago by </Feed.Date>
          <Feed.User>Elliot Fu</Feed.User>
        </Feed.Summary>
        <Feed.Meta>
          <Feed.Like>
            
            <Icon name='like' />
            4 Likes
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>

  </Feed>
)

export default Content;
