import React, { Component } from 'react';
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
        <Menu fixed='top'inverted color='grey' fitted='vertically'>
          <Container>
            <Dropdown item simple text='MY SUBREDDIT'>
              <Dropdown.Menu>
                {this.state.subreddits.map((sr, i) => {
                  // key will be sr._id with live data
                  return <Dropdown.Item text={sr} as={Link} to={`/r/${sr.toLowerCase()}`} key={i}></Dropdown.Item>
                })}
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item ><Link to='/'>Home</Link></Menu.Item>
                {/* // key will be sr._id with live data */}
            {this.state.subreddits.map((sr, i) => {
              return <Menu.Item as={Link} to={`/r/${sr.toLowerCase()}`} key={i}>{sr}</Menu.Item>
            })}
            <Link to='/subreddits'><Menu.Item >Edit</Menu.Item></Link>
          </Container>
        </Menu>
      </div>
    )
  }
}

export default NavHead;