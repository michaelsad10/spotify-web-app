import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import QRCode from './QRCode';
import Tracks from './Tracks'; 

class UserPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            qr: '',
            playlists: [],
            tracks_href: [],
            tracks: [],
            songs: [],
        }
        this.getPlaylists = this.getPlaylists.bind(this);
    }
    componentDidMount() {
        this.getPlaylists();
    }
    getPlaylists() {
        let config = {
            headers: {
                'Authorization': '' + this.props.token_type + " " + this.props.access_token
            }
        }
        axios.get(`https://api.spotify.com/v1/users/${this.props.user_id}/playlists`, config)
            .then(response => this.setState({ data: response.data }))
            // , console.log(response.data)
    }
    
    render() {
        if (this.state.data != '') {
            var playlists = [];
            for (var x = 0; x < this.state.data.items.length; x++) {
                playlists.push(
                    <Card key={x}>
                        <Card.Header>
                            <Accordion.Toggle as={Button} eventKey={x}>
                                {this.state.data.items[x].name}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={x}>
                            <Card.Body>
                                <Tracks tracks = {this.state.data.items[x].tracks.href} access_token = {this.props.access_token} token_type = {this.props.token_type}> </Tracks>
                                {/* {song_artist} */}
                                <QRCode url = {this.state.data.items[x].external_urls.spotify}> </QRCode>
                                {/* <Image src={qrUrl} rounded /> */}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                );
            }
        }

        return (
            <Accordion defaultActiveKey="0">
                {playlists}
            </Accordion>
        );
    }
}
export default UserPlaylist; 