import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Spotify from 'spotify-web-api-js';
import axios from 'axios'; 

const spotifyWebApi = new Spotify();

export const authEndpoint = 'https://accounts.spotify.com/authorize?';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "4fa655f5a2e04f5baaa9f13b6283bddf";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
];
// Get the hash of the url
class App extends Component {
  constructor(props) {
    super(props);
    // const params = this.getHashParams();
    this.state = {
      access_token: '',
      token_type: '', 
      expires_in: '', 
    };
    this.getHashParams = this.getHashParams.bind(this); 
    this.search = this.search.bind(this); 
  }
  
  componentDidMount() {
    this.setState({params: this.getHashParams()})
  }

  search() {
    let config = {
      headers: {
        'Authorization': '' + this.state.token_type + " " + this.state.access_token
      },
    }
    axios.get("https://api.spotify.com/v1/search?q=NO%20BYSTANDERS&type=track", config)
    .then((response) => {
      console.log(response); 
    })
  }

  getHashParams() {
    var url = window.location.hash;  // Gets URI after # 
    var urlSplit = url.split("&");  // Splits the URI 
    var access_token = urlSplit[0].substring(urlSplit[0].indexOf("=")+1,urlSplit[0].length);  // Gets Access Token 
    var token_type = urlSplit[1].substring(urlSplit[1].indexOf("=")+1, urlSplit[1].length);
    var expires_in = urlSplit[2].substring(urlSplit[2].indexOf("=")+1, urlSplit[2].length);      
    this.setState({access_token: access_token,
      token_type: token_type,
      expires_in: expires_in
    });
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
        <button onClick={this.search}> Hello </button>
        </header>
      </div>
    );
  }
}
export default App;