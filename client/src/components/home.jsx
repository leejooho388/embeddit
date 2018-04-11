import React, { Component } from "react";

class Main extends Component {
  constructor(props) {
    super(props), (this.state = {});
  }

  render() {
    return (
    <div>
      {/* HEADER SECTION/NAVBAR, separate component?*/}
      This is the header
      <div id="header">
        <div id="sr-header-area">This is where the list of subreddits go(including dropdown?)</div>
        <div id="header-bottom-left">reddit icon/log && tabmenu goes here</div>
        <div id="header-bottom-right">
          <span class="user">
          {/* <a> tag w/ href="https://www.embeddit.com/user/${username}" or log in*/}
          {/* <span class="userkarma" title"post karma">{karma.value}</span> */}
          username gose here
          </span>
          <span class="separator">|</span>
          <form method="post" action="http:s//www.embeddit.com/logout" class="logout hover">
            {/* <a> tag onclick to log out */}
            log out button goes here
          </form>
          </div>
        </div>
      </div>

      <div class ="side">
      {/* RIGHT SIDE/LOGIN SECTION, separate component? */}
      This is the side view on the right
        <div class="spacer">
          <form id="search"></form>
        </div>


      </div>




















    </div>
    )
  }
}

export default Main;
