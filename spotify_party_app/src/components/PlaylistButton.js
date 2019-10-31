import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { Component } from 'react';
class PlaylistButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist_name : 'Playlist',
            playlist_id : ''
        }
    }

    handleChoice = (name, id) => {
        this.setState({
            playlist_name : name,
            playlist_id : id
            },
            this.sendPlaylistId);
    }

    sendPlaylistId = () => {
        this.props.handlePlaylistId(this.state.playlist_id); 
    }

    render() {
        var options = [];
        var choice = <Dropdown.Toggle variant="success" id="dropdown-basic">
            {this.state.playlist_name}
        </Dropdown.Toggle>
        var playlists_obj = {};
        for (var x=0; x < this.props.playlists_name.length; x++) {
            const name = this.props.playlists_name[x];
            const playlist_id = this.props.playlists_id[x]; 
            playlists_obj[this.props.playlists_name[x]] = this.props.playlists_id[x];
            options.push(
                <Dropdown.Item key={x} onClick={ () => this.handleChoice(name, playlist_id)}> {this.props.playlists_name[x]} </Dropdown.Item>
            );
        }
        return (
            <Dropdown>
                {choice}
                <Dropdown.Menu>
                    {options}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

export default PlaylistButton; 