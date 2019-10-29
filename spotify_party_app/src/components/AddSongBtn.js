import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { Component } from 'react';
import axios from 'axios';
class AddSongBtn extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var options = [];
        var playlist = 'Playlist';
        var choice = <Dropdown.Toggle variant="success" id="dropdown-basic">
            {playlist}
        </Dropdown.Toggle>
        var playlists_obj = {};
        for (var x=0; x < this.props.playlists_name.length; x++) {
            playlists_obj[this.props.playlists_name[x]] = this.props.playlists_id[x];
            options.push(
                <Dropdown.Item key={x}> {this.props.playlists_name[x]} </Dropdown.Item>
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