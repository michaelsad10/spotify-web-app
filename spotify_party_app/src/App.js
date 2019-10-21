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
      name: "michael",
      selected: 'Options',
      // loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: 'Not Checked',
        image: '',
      },
      input: '',
      artists: '',
      songs: '',
      params: '', 
    };
    this.getHashParams = this.getHashParams.bind(this); 
  }
  
  componentDidMount() {
    this.setState({params: this.getHashParams()})
    console.log("hello");
  }

  search() {
    let p = this.getHashParams(); 
    let config = {
      headers: {
        'Authorization': 'Bearer ' + p.access_token
      },
    }
    axios.get("https://api.spotify.com/v1/search?q=roadhouse%20blues&type=track", config)
    .then((response) => {
      console.log(response); 
    })
  }
   getHashParams = () => {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1); 
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    console.log(hashParams); 
    return hashParams;
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