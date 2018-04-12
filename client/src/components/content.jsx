import React from 'react'
import { Feed, Icon } from 'semantic-ui-react'

const Content = () => (
  // <Feed>
  //   <Feed.Event> 1
  //     <Feed.Label>
  //       {/* <img src='./../../upvoteArrow.png'/> */}
  //     </Feed.Label>
  //     <Feed.Content>
  //       <Feed.Summary>
  //         <Feed.Date>submitted 1 Hour Ago by </Feed.Date>
  //         <Feed.User>Elliot Fu</Feed.User>
  //       </Feed.Summary>
  //       <Feed.Meta>
  //         <Feed.Like>
  //           4 Likes
  //         </Feed.Like>
  //       </Feed.Meta>
  //     </Feed.Content>
  //   </Feed.Event>

  // </Feed>
  <div class="ui celled grid">
    <div class="row">
      <div class="three wide column">
        <img>
      </div>
    <div class="thirteen wide column">
      <p></p>
    </div>
  </div>
  <div class="row">
    <div class="three wide column">
      <img>
    </div>
    <div class="ten wide column">
      <p></p>
    </div>
    <div class="three wide column">
      <img>
    </div>
  </div>
</div>
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