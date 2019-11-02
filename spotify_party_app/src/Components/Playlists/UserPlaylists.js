import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import QRCode from '../SongList/QRCode';
import Tracks from './Tracks';

class UserPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            playlists: [],
            playlists_name: [], 
        }
        this.getPlaylists = this.getPlaylists.bind(this);
        this.sendPlaylistId = this.sendPlaylistId.bind(this);
    }

    sendPlaylistId() {
        this.props.sendPlaylistId(this.state.playlists, this.state.playlists_name)
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
        var playlists = [];
        var playlists_name = []; 
        axios.get(`https://api.spotify.com/v1/users/${this.props.user_id}/playlists`, config)
            .then((response => {
                if (response != null) {
                    this.setState({ data: response.data })
                    for (var x = 0; x < response.data.items.length; x++) {
                        playlists.push(response.data.items[x].id);
                        playlists_name.push(response.data.items[x].name); 
                    }
                    this.setState({
                        playlists_name: playlists_name, 
                        playlists: playlists,
                        data: response.data
                    });
                }
                this.sendPlaylistId(); 
            }))
    }

    render() {
        if (this.state.data != '' && this.state.playlists != '') {
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
                                <Tracks tracks={this.state.data.items[x].tracks.href} access_token={this.props.access_token} token_type={this.props.token_type}> </Tracks>
                                <QRCode url={this.state.data.items[x].external_urls.spotify}> </QRCode>
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