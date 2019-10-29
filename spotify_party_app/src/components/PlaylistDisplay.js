import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class PlaylistDisplay extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            data : '', 
        }
        this.getTracks = this.getTracks.bind(this); 
    }


    getTracks() {
        let config = {
            headers: {
                'Authorization': '' + this.props.token_type + " " + this.props.access_token
            }
        }
        axios.get(`https://api.spotify.com/v1/playlists/${this.props.playlist_id}`, config)
        .then(response => this.setState({data: response.data}))
    }

    render() {
        return (
            <Button onClick={this.getTracks}> Get Tracks </Button>
        );
    }

}   

export default PlaylistDisplay; 