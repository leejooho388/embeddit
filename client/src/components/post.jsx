import React, { Component } from 'react';

export default class Post extends Component {
  

  render() {
    return (
      <div>
        {this.props.children}
        <h3>submit to reddit</h3>
        <form>
          
        </form>
      </div>
    );
  }
}