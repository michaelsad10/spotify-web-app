import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { Component } from 'react';
import axios from 'axios';
class AddSongBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist_name : 'Playlist'
        }
    }

    handleChoice = (name) => {
        this.setState({playlist_name : name}); 
    }
    render() {
        var options = [];
        var choice = <Dropdown.Toggle variant="success" id="dropdown-basic">
            {this.state.playlist_name}
        </Dropdown.Toggle>
        var playlists_obj = {};
        for (var x=0; x < this.props.playlists_name.length; x++) {
            const name = this.props.playlists_name[x];
            console.log(name); 
            playlists_obj[this.props.playlists_name[x]] = this.props.playlists_id[x];
            options.push(
                <Dropdown.Item key={x} onClick={ () => this.handleChoice(name)}> {this.props.playlists_name[x]} </Dropdown.Item>
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

export default AddSongBtn; 