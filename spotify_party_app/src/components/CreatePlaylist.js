import React, { Component } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


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
        this.setState({access_token: this.props.access_token})
        this.setState({token_type: this.props.token_type})
    }

    handleSearch = (search) => {
        this.setState({ playlist_name: search.target.value })
    }

    sendPlaylistId(id, href, playlist_id) {
        console.log(id); 
        console.log(href);
        console.log(playlist_id); 
        this.props.sendPlaylistId(id, href, playlist_id);
    }

    getUserId() {
        let config = {
            headers: {
                'Authorization': '' + this.props.token_type + " " + this.props.access_token
            },
        }
        axios.get("https://api.spotify.com/v1/me", config)
            .then(response => this.setState({ data: response.data }, console.log(response.data)))

        // axios.get("https://api.spotify.com/v1/me", config)
        //     .then((response) => {
        //         if (response != null) {
        //             this.setState({user_id : response.data.id,
        //                 access_token: this.props.access_token, 
        //                 token_type: this.props.token_type,
        //             }) 
        //         }
        //     })
    }

    getPlaylistId() {
        let config = {
            headers: {
                'Authorization': '' + this.state.token_type + " " + this.state.access_token
            },
        }
        console.log(this.state.token_type); 
        console.log(this.state.access_token); 
        axios.post(`https://api.spotify.com/v1/users/${this.state.data.id}/playlists`, {
            name: this.state.playlist_name,
            public: false,
            collaborative: true,
        }, config)
        .then(response => this.setState({playlist_data: response.data}, this.sendPlaylistId(this.state.data.id, response.data.href, response.data.id)))
        // this.sendPlaylistId(this.state.data.id, this.state.playlist_data.href, this.state.playlist_data.id)
    }

    render() {
        return (
            <div>
                <Form>
                    <FormControl onChange={this.handleSearch} type="text" placeholder="Playlist Name" className="mr-sm-2" />
                </Form>
                <Button onClick={this.getPlaylistId} > Create </Button>
            </div>
        )
    }
}

export default CreatePlaylist; 