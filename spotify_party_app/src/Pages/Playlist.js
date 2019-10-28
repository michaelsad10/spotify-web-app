import React, { Component } from 'react';
import PlaylistsBox from '../components/PlaylistsBox';
class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            access_token: '',
            token_type: '',
            expires_in: '',
        }
    }

    componentDidMount() {
        this.setState({
            access_token: this.props.access_token, 
            token_type: this.props.token_type, 
            expires_in: this.props.expires_in, 
        })
        console.log(this.state.access_token);
    }

    render() {
        return (
            <div>
                <p>{this.state.access_token}</p> 
                <PlaylistsBox loggedIn={this.props.loggedIn} access_token={this.props.access_token} token_type={this.props.token_type}> </PlaylistsBox>
            </div>
        );
    }
}
export default Playlist; 