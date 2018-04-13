import React, { Component } from 'react';
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment, Link } from 'semantic-ui-react';

class NavHead extends Component {
  constructor(props) {
    super(props),
    this.state = {
      subreddits: ['ASKREDDIT', 'WORLDNEWS', 'VIDEOS', 'FUNNY', 'TODAYILEARNED', 'PICS', 'GAMING']
    };
  }

  render () {
    return (
      <div>
        <Menu fixed='top' inverted color='grey' fitted='vertically'>
          <Container>
            <Dropdown item simple text='MY SUBREDDIT'>
              <Dropdown.Menu>
                {this.state.subreddits.map((sr, i) => {
                  return <Dropdown.Item key={i}>{sr}</Dropdown.Item>
                })}
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item as={Link} to='/'>Home</Menu.Item>
            {this.state.subreddits.map((sr, i) => {
              return <Menu.Item key={i}>{sr}</Menu.Item>
            })}
          </Container>
        </Menu>
      </div>
    )
  }
}

export default NavHead;