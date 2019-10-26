import React, { Component } from "react";
import "./App.css";
import axios from 'axios'; 
import SearchBar from './components/SearchBar'; 
import SongBox from './components/SongBox'; 


const authEndpoint = 'https://accounts.spotify.com/authorize?';
const clientId = "4fa655f5a2e04f5baaa9f13b6283bddf";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
];
const login = authEndpoint + "client_id=" + clientId + "&redirect_uri=" + redirectUri + "&scope=" + scopes[0]+"%20"+scopes[1]+"&response_type=token&show_dialog=true";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: '',
      token_type: '', 
      expires_in: '', 
      loggedIn: false,
      songs: '', 
      artists: '', 
      input: '', 
    };
    if(this.state.access_token != '') {
      this.state.loggedIn = true; 
    }
    this.getHashParams = this.getHashParams.bind(this); 
    this.search = this.search.bind(this);
  }
  
  componentDidMount() {
    if(window.location.hash !== '') {
      this.setState({params: this.getHashParams()}) // This gets the URI 
    }
  } 

  search() {
    let config = {
      headers: {
        'Authorization': '' + this.state.token_type + " " + this.state.access_token
      },
    }
    axios.get("https://api.spotify.com/v1/search?q=NO%20BYSTANDERS&type=track", config)
    .then((response) => { 
      this.setState({song: response})
      if(this.state.song != null) {
        this.state.songName = (this.state.song.data.tracks.items[0].name);
      }     
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

  songCallBack = (songs, artists) => {
    this.setState({songs:songs})
    this.setState({artists:artists})
  }

  // Need to check if the person is actually logged in 

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <button> 
          <a href={login}> Login to Spotify  </a>
        </button>
      <SearchBar loggedIn = {this.state.loggedIn} parentCallBack = {this.songCallBack} access_token = {this.state.access_token} token_type = {this.state.token_type} > </SearchBar>
      <SongBox songs = {this.state.songs} artists = {this.state.artists}> </SongBox>
        </header>
      </div>
    );
  }
}
export default App;