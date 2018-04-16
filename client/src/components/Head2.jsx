import React, { Component } from "react";
import { connect } from 'react-redux';
import { Header, Image, Segment} from "semantic-ui-react";
import rIcon from "../../../images/reddit_logo.png";
import { logOutUser } from '../actions';
import { Link } from 'react-router-dom';

class Head2 extends Component {

  componentWillReceiveProps() {
    this.render();
  }

  render() {

    const renderUserHeader = this.props.authenticated ? (
      <div id="userHeader">
        <Segment.Group className="pointer" size="mini" horizontal>
          <Segment tertiary size="mini" compact>{this.props.user.username}</Segment>
          <Segment tertiary size="mini" compact>({this.props.user.postKarma} | {this.props.user.commentKarma})</Segment>
          <Segment tertiary onClick={this.props.logOutUser} size="mini" compact>log out</Segment>
        </Segment.Group>
      </div>
    ) : (
      null
    )

    return (
      <Header id="head2" as="h3" block>
        <Link to="/" ><div id="logo">
          <Image id="alien" src={rIcon} size="mini" verticalAlign="bottom" />
          <h2 id="title">&lt;Embeddit /&gt;</h2>
        </div></Link>
        {renderUserHeader}
      </Header>
    )
  }
};

const mapStateToProps = (state) => {
  return { authenticated: state.authReducer.authenticated,
           user: state.authReducer.user
  };
};

export default connect(mapStateToProps, { logOutUser })(Head2);
