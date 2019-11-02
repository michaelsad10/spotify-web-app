import React, { Component } from "react";
import "./App.css";
import SearchBar from './Components/Search/SearchBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TopNav from './Components/Nav/TopNav';
import CreatePlaylist from './Components/Playlists/CreatePlaylist';
import UserPlaylists from './Components/Playlists/UserPlaylists';
import UserId from './Utilities/UserId';
import NowPlaying from './Components/NowPlaying/NowPlaying';
import SongList from './Components/SongList/SongList'; 

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {componentscomponents
  constructor(props) {
    super(props);
    this.state = {
      access_token: '',
      token_type: '',
      expires_in: '',
      loggedIn: false,
      input: '',
      playlist: '',
      userName: '',
      playlist_id: '',
      user_id: '',
      playlist_href: '',
      allPlaylistIds: [], 
      playlists_name: [], 
      songs: [], 
      artists: [], 
      album_covers: [],
      song_uris: [], 
    };
    this.getSpotify = this.getSpotify.bind(this);
    this.getHashParams = this.getHashParams.bind(this);
    this.getPlayListId = this.getPlayListId.bind(this);
    this.getUserId = this.getUserId.bind(this);
    this.getAllPlaylistId = this.getAllPlaylistId.bind(this); 
  }


  componentDidMount() {
    if (window.location.hash !== '') {
      this.setState({ params: this.getHashParams() }) // This gets the URI 
    }
  }

  getHashParams() {
    var url = window.location.hash;  // Gets URI after # 
    var urlSplit = url.split("&");  // Splits the URI 
    var access_token = urlSplit[0].substring(urlSplit[0].indexOf("=") + 1, urlSplit[0].length);  // Gets Access Token 
    var token_type = urlSplit[1].substring(urlSplit[1].indexOf("=") + 1, urlSplit[1].length);
    var expires_in = urlSplit[2].substring(urlSplit[2].indexOf("=") + 1, urlSplit[2].length);
    this.setState({
      access_token: access_token,
      token_type: token_type,
      expires_in: expires_in,
      loggedIn: true,
    });
  }

  getSpotify(access_token, token_type, expires_in) {
    this.setState({
      access_token: access_token,
      token_type: token_type,
      expires_in
    })
  }

  songCallBack = (songs, artists, album_covers, song_uris) => {
    this.setState({
      songs: songs,
      artists: artists,
      album_covers: album_covers, 
      song_uris: song_uris, 
    })
  }

  getPlayListId(id, href, playlist_id) {
    this.setState({ user_id: id })
    this.setState({ playlist_href: href })
    this.setState({ playlist_id: playlist_id })
  }

  getAllPlaylistId(playlists, playlists_name) {
    this.setState({allPlaylistIds : playlists,
      playlists_name : playlists_name
    })
  }
  getUserId(id) {
    this.setState({ user_id: id });
  }

  render() {
    return (
      <div className="background">
        <TopNav userName={this.state.userName} loggedIn={this.state.loggedIn}></TopNav>
        <Container>
          <Row>
            {this.state.token_type && (<NowPlaying token_type={this.state.token_type} access_token={this.state.access_token} ></NowPlaying>)}
          </Row>
          <Row>
            <Col md={5}> {this.state.token_type && (<CreatePlaylist sendPlaylistId={this.getPlayListId} token_type={this.state.token_type} access_token={this.state.access_token}> </CreatePlaylist>)} </Col>
            <Col md={5}> {this.state.token_type && (<SearchBar songCallback = {this.songCallBack} access_token = {this.state.access_token} token_type = {this.state.token_type} > </SearchBar>)} </Col>
          </Row>
          <Row>
            <Col md={5}> {this.state.user_id && this.state.access_token && <UserPlaylists sendPlaylistId = {this.getAllPlaylistId} access_token={this.state.access_token} token_type={this.state.token_type} user_id={this.state.user_id} playlist_id = {this.state.playlist_id}> </UserPlaylists>} </Col>
            <Col md={5}> {this.state.access_token && this.state.songs && (<SongList songs = {this.state.songs} song_uri = {this.state.song_uris} artists = {this.state.artists} album_covers = {this.state.album_covers} access_token={this.state.access_token} token_type={this.state.token_type} playlists_id = {this.state.allPlaylistIds} playlists_name = {this.state.playlists_name}> </SongList>)} </Col>
          </Row>
          {this.state.access_token && (<UserId sendId={this.getUserId} access_token={this.state.access_token} token_type={this.state.token_type}> </UserId>)}
        </Container>
      </div>
    );
  }


}
export default App;