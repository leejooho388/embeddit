import React from "react";
import { Header, Image, Segment} from "semantic-ui-react";
import rIcon from "../../../images/reddit_logo.png";

const Head2 = () => (
  <Header id="head2" as="h3" block>
    <div>
      <Image className="title" src={rIcon} size="tiny" verticalAlign="bottom" />
      <h2 className="title">&lt;Embeddit /&gt;</h2>
    </div>
    <span>
      <div id="head2text" >
        <Segment.Group horizontal>
          <Segment>Username</Segment>
          <Segment>Karma</Segment>
          <Segment>Logout</Segment>
        </Segment.Group>
      </div>
    </span>
  </Header>
);

export default Head2;
