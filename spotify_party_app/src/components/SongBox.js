import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button"; 

class SongBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let songBoxes = [];

    for (var x = 0; x < this.props.songs.length; x++) {
      songBoxes.push(
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} eventKey={x}>
              {this.props.songs[x]}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={x}>
            <Card.Body> {this.props.artists[x]} </Card.Body>
          </Accordion.Collapse>
        </Card>
      );
    }

    return (
      <Accordion defaultActiveKey="0">
          {songBoxes}
      </Accordion>
    );
  }
}

export default SongBox;
