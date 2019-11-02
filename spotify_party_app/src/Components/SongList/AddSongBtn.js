import React, { Component } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';


class AddSongBtn extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            playlist_name : 'Playlist',
            playlist_id : '',
            song_uri : '', 
        }
    }

    handleChoice = (name, playlist_id, song_uri) => {
        this.setState({
            playlist_name : name,
            playlist_id : playlist_id,
            song_uri : song_uri, 
        
        }, this.addSongToPlaylist); // Have callback function that calls addSongToPlaylist
    }

    addSongToPlaylist = () => {
        let config = {
            headers: {
                'Authorization': '' + this.props.token_type + " " + this.props.access_token,
                'Content-Type': 'application/json',
            },
        }
        axios.post(`https://api.spotify.com/v1/playlists/${this.state.playlist_id}/tracks`, {
        uris: [this.state.song_uri]
        }, config)
        .then(response => {
        })
    }

    render() {
       const options = [];
       const addButton = <Dropdown.Toggle variant="success" id="dropdown-basic">
            Add Song 
        </Dropdown.Toggle>
        for (var x=0; x <this.props.playlists_id.length; x++) {
            const name = this.props.songName; 
            const playlist_id = this.props.playlists_id[x]; 
            const song_uri = this.props.song_uri; 
            options.push(
                <Dropdown.Item key={x} onClick={ () => this.handleChoice(name, playlist_id, song_uri)}> {this.props.playlists_name[x]} </Dropdown.Item>
            );
        }
        return(
            <Dropdown>
                {addButton}
                <Dropdown.Menu>
                    {options}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

export default AddSongBtn; 