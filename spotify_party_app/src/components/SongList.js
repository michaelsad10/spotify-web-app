import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button  from 'react-bootstrap/Button'; 
import AddSongBtn from './AddSongBtn'; 

class SongList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        var songs = [];
        for (var x = 0; x < this.props.songs.length; x++) {
            songs.push(
            <Card key={x}>
                <Card.Header>
                    <Accordion.Toggle as={Button} eventKey={x}>
                        {this.props.songs[x]}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={x}>
                    <Card.Body>
                    {this.props.artists[x]}
                    <img src={this.props.album_covers[x]} height="200" width="175"/>
                    <AddSongBtn playlists_name = {this.props.playlists_name} playlists_id = {this.props.playlists_id} access_token={this.state.access_token} token_type={this.state.token_type}> </AddSongBtn>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            );
        }
        return (
            <Accordion defaultActiveKey="0">
                {songs}
            </Accordion>
        );
    }
}
export default SongList; 