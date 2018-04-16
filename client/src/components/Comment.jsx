import React, { Component } from "react";
import { Grid, Icon } from "semantic-ui-react";
import Moment from "moment";

class Comments extends Component {
  constructor(props) {
    super(props),
    this.state = {
      shown: true,
      comment: props.commentObj
    }
    this.toggleComment = this.toggleComment.bind(this);
  }

  toggleComment() {
    this.setState({
      shown: !this.state.shown
    })
  }

  render() {
    return (
      <Grid>
        {this.state.shown ? 
        <Grid.Row>
          <Grid.Column width={1} floated="left">
            <Grid celled="internally">
              <Grid.Row centered={true}>
                <Icon className='pointer' name="arrow up" size="large" color="grey" />
              </Grid.Row>
              <Grid.Row centered={true}>
                <Icon className='pointer' name="arrow down" size="large" color="grey" />
              </Grid.Row>
            </Grid>
          </Grid.Column>

          <Grid.Column width={15}>
            <Grid.Row>
              <Icon className='pointer' name="minus square outline" color="grey" onClick={this.toggleComment} onMouseOver={this.handleMouseOver} />
              {this.state.comment.author.name}
              {/* apply moment here */}
              {this.state.comment.createdAt}
            </Grid.Row>

            {/* comment */}
            <Grid.Row>
              {this.state.comment.text}
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
        :
        <Grid.Row>
          <Grid.Column width={1} floated="left">
          </Grid.Column>

          <Grid.Column width={15}>
            <Grid.Row>
              <Icon className='pointer' name="plus square outline" color="grey" onClick={this.toggleComment} />
              {this.state.comment.author.name}
              {/* apply moment here */}
              {this.state.comment.createdAt}
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
        }
      </Grid>
    );
  }
}

export default Comments;
