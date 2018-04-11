import React, { Component } from "react";
import Header from './header.jsx';
import Side from './side.jsx';
import Content from './content.jsx';

class Main extends Component {
  constructor(props) {
    super(props), (this.state = {});
  }

  render() {
    return (
    <div>
      {/* HEADER SECTION/NAVBAR, separate component?*/}
      {/* This is the header */}
      <Header />
      {/* This is where the login/post link/post text on the right */}
      <Side />
      {/* This is the main content with all the related post */}
      <Content />

    </div>
    )
  }
}

export default Main;
