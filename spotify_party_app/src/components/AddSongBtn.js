import Button  from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'; 
import React, { Component } from 'react';
import axios from 'axios';
class AddSongBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        var options = []; 
        for(var x=0; x<this.props.playlists_name.length; x++) {
            options.push(
                <Dropdown.Item key={x}> {this.props.playlists_name[x]} </Dropdown.Item>
            );
        }
        return(
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Playlists
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {options}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

export default AddSongBtn; 