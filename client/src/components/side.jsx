import React, { Component } from 'react';

class Side extends Component {
  render() {
    return (
      <div class ="side">
      {/* RIGHT SIDE/LOGIN SECTION, separate component? */}
      This is the side view on the right where logging/new submission goes
        <div class="spacer">
          <form id="search" role="search">
            <input type="text" placeholder="search" tabindex="20"></input>
          </form>
        </div>
        {/* submit-link media*/}
        <div class="spacer">
          <div class="sidebox submit submit-link">
            <div class="morelink">
            <a href="https://www.reddit.com/submit" data-event-action="submit" data-type="subreddit" data-event-detail="link" class="login-required access-required" target="_top">Submit a new link</a>
             <div class="nub"></div>
            </div>
          </div>
        </div>
        {/* sumbit-textpost */}
        <div class="spacer">
          <div class="sidebox submit submit-text">
            <div class="morelink">
              <a href="https://www.reddit.com/submit?selftext=true" data-event-action="submit" data-type="subreddit" data-event-detail="self"
                class="login-required access-required" target="_top">Submit a new text post</a>
              <div class="nub"></div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Side;