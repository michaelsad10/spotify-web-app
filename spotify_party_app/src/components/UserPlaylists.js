import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class UserPlaylist extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            data: '',
            qr: '', 
            playlists : []
        }
        this.getPlaylists = this.getPlaylists.bind(this); 
        this.getQrCode = this.getQrCode.bind(this); 
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
        .then(response => this.setState({data: response.data}, console.log(response.data)))
    }

    getQrCode(href) {
        axios.get(`http(s)://api.qrserver.com/v1/create-qr-code/?data=${href}&size=100x100`)
        .then(response => this.setState({qr: response.data}, console.log(response.data)))
    }

    render() {

        return (
            <Button onClick={this.getPlaylists}> Get User Playlists </Button>
        );
    }
}
export default UserPlaylist; 