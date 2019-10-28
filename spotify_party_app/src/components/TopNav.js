import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const authEndpoint = 'https://accounts.spotify.com/authorize?';
const clientId = "4fa655f5a2e04f5baaa9f13b6283bddf";
const redirectUri = "http://localhost:3000";
const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "playlist-modify-public",
    "playlist-modify-private",
    "playlist-read-collaborative",
    "playlist-read-private",
];
const login = authEndpoint + "client_id=" + clientId + "&redirect_uri=" + redirectUri + "&scope=" + scopes[0] + "%20" + scopes[1] + "%20" + scopes[2] + "%20" + scopes[3] + "%20" + scopes[4] + "%20" + scopes[5] + "&response_type=token&show_dialog=true";

class TopNav extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var nav_login = '';
        if (this.props.userName != '' && this.props.loggedIn != false) {
            nav_login = <Nav.Link> {this.props.userName} </Nav.Link>;
        }
        else {
            nav_login = <Nav.Link href={login}> Spotify Login </Nav.Link>;
        }
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Spotify Party App</Navbar.Brand>
                {/* <Nav className="mr-auto">
                    <Nav.Link href="/home"> Home </Nav.Link>
                    <Nav.Link href="/playlist"> Playlist </Nav.Link>
                </Nav> */}
                <Nav className="justify-content-end">
                    {nav_login}
                </Nav>
            </Navbar>
        );
    }
}
export default TopNav; 