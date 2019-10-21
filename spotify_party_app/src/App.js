import React, { Component } from "react";
import hash from "hash";
import logo from "./logo.svg";
import "./App.css";
export const authEndpoint = 'https://accounts.spotify.com/authorize?';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "9f25ac7ba70e4a12992aeac88c355f2b";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
];
// Get the hash of the url
class App extends Component {
  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
    }
  }
render() {
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <a
          className="btn btn--loginApp-link"
          href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
        >
          Login to Spotify
        </a>
      </header>
    </div>
  );
  }
}
export default App;