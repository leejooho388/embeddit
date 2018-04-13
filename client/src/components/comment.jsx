import React, { Component } from "react";
import { Grid, Icon } from "semantic-ui-react";
import Moment from "moment";

class Comments extends Component {
  constructor(props) {
    super(props),
    this.state = {
      shown: true
    }
    this.toggleComment = this.toggleComment.bind(this);
  }

  toggleComment() {
    this.setState({
      shown: !this.state.shown
    })
    console.log(this.state)
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
              Username goes here
              {/* apply moment here */}
              3 hours ago
            </Grid.Row>

            {/* comment */}
            <Grid.Row>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum
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
              Username goes here
              {/* apply moment here */}
              3 hours ago
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
        }
      </Grid>
    );
  }
}

export default Comments;
