import React, { Component } from 'react';
import { Container, Menu, Image, Dropdown } from 'semantic-ui-react';

class Header extends Component {
  render() {
    return (
      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Dropdown item simple text='MY SUBREDDITS'>
              <Dropdown.Menu>
                <Dropdown.Item>Subreddit 1</Dropdown.Item>
                <Dropdown.Item>Subreddit 2</Dropdown.Item>
                <Dropdown.Item>Subreddit 3</Dropdown.Item>
                <Dropdown.Item>Subreddit 4</Dropdown.Item>
                <Dropdown.Item>Subreddit 5</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Menu>
      </div>
    );
  }
}

export default Header;

      // <div id="header">
      // {/* HEADER SECTION/NAVBAR, separate component?*/}
      // This is the header
      //   <div id="sr-header-area">This is where the list of subreddits go(including dropdown?)</div>
      //   <div id="header-bottom-left">reddit icon/log && tabmenu goes here</div>
      //   <div id="header-bottom-right">
      //     <span className="user">
      //     {/* <a> tag w/ href="https://www.embeddit.com/user/${username}" or log in*/}
      //     {/* <span className="userkarma" title"post karma">{karma.value}</span> */}
      //     username gose here
      //     </span>
      //     <span className="separator">|</span>
      //     <form method="post" className="logout hover">
      //       {/* <a> tag onclick to log out */}
      //       log out button goes here
      //     </form>
      //   </div>
      // </div>

