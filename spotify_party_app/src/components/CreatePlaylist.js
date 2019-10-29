import React, { Component } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './CreatePlaylist.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class CreatePlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist_name: '',
            playlist_href: '',
            user_id: '',
            playlist_id: '',
            data: '',
            access_token: '',
            token_type: '',
            playlist_data: '',
        };
        this.getUserId = this.getUserId.bind(this);
        this.sendPlaylistId = this.sendPlaylistId.bind(this);
        this.getPlaylistId = this.getPlaylistId.bind(this);
    }
    componentDidMount() {
        this.getUserId();
        this.setState({ access_token: this.props.access_token })
        this.setState({ token_type: this.props.token_type })
    }

    handleSearch = (search) => {
        this.setState({ playlist_name: search.target.value })
    }

    sendPlaylistId(id, href, playlist_id) {
        this.props.sendPlaylistId(id, href, playlist_id);
    }

    getUserId() {
        let config = {
            headers: {
                'Authorization': '' + this.props.token_type + " " + this.props.access_token
            },
        }
        axios.get("https://api.spotify.com/v1/me", config)
            .then(response => this.setState({ data: response.data }, ))
    }

    getPlaylistId() {
        let config = {
            headers: {
                'Authorization': '' + this.state.token_type + " " + this.state.access_token
            },
        }
        axios.post(`https://api.spotify.com/v1/users/${this.state.data.id}/playlists`, {
            name: this.state.playlist_name,
            public: false,
            collaborative: true,
        }, config)
            .then(response => this.setState({ playlist_data: response.data }, this.sendPlaylistId(this.state.data.id, response.data.href, response.data.id)))
    }

    render() {
        return (
            <div>
                <Form inline>
                    <FormControl className="mr-sm-2" onChange={this.handleSearch} type="text" placeholder="Playlist Name" className="mr-sm-2" />
                    <Button type="submit" onClick={this.getPlaylistId} > Create </Button>
                </Form>
                
            </div>
        )
    }
}

export default CreatePlaylist; 