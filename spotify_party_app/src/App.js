import React, { Component } from "react";
import "./App.css";
import SearchBar from './components/SearchBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SongBox from './components/SongBox';
import PlaylistsBox from './components/PlaylistsBox';
import TopNav from './components/TopNav';
import CreatePlaylist from './components/CreatePlaylist';
import PlaylistDisplay from './components/PlaylistDisplay'
import UserPlaylists from './components/UserPlaylists';
import UserId from './components/UserId';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
      playlist: '',
      userName: '',
      playlist_id: '',
      user_id: '',
      playlist_href: '',
    };
    this.getSpotify = this.getSpotify.bind(this);
    this.getHashParams = this.getHashParams.bind(this);
    this.getPlayListId = this.getPlayListId.bind(this);
    this.getUserId = this.getUserId.bind(this);
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

  songCallBack = (songs, artists) => {
    this.setState({ songs: songs })
    this.setState({ artists: artists })
  }

  getPlayListId(id, href, playlist_id) {
    this.setState({ user_id: id })
    this.setState({ playlist_href: href })
    this.setState({ playlist_id: playlist_id })
  }

  getUserId(id) {
    this.setState({ user_id: id });
  }

  render() {
    return (
      <div>
        <TopNav userName={this.state.userName} loggedIn={this.state.loggedIn}></TopNav>
        <Container>
          <Row>
            <Col md={6}> {this.state.token_type && (<CreatePlaylist sendPlaylistId={this.getPlayListId} token_type={this.state.token_type} access_token={this.state.access_token}> </CreatePlaylist>)} </Col>
            <Col md={6}> <SearchBar loggedIn = {this.state.loggedIn} parentCallBack = {this.songCallBack} access_token = {this.state.access_token} token_type = {this.state.token_type} > </SearchBar> </Col>
          </Row>
          <Row>
            <Col md={6}> {this.state.user_id && this.state.access_token && <UserPlaylists access_token={this.state.access_token} token_type={this.state.token_type} user_id={this.state.user_id}> </UserPlaylists>} </Col>
            <Col md={6}> <SongBox songs = {this.state.songs} artists = {this.state.artists}> </SongBox> </Col> 
          </Row>
        </Container>

        {this.state.access_token && (<UserId sendId={this.getUserId} access_token={this.state.access_token} token_type={this.state.token_type}> </UserId>)}
        {/* {this.state.playlist_id && (<PlaylistDisplay  access_token = {this.state.access_token} token_type = {this.state.token_type} playlist_id = {this.state.playlist_id}> </PlaylistDisplay>)} */}
        {/* <PlaylistsBox  loggedIn = {this.state.loggedIn} access_token = {this.state.access_token} token_type = {this.state.token_type}> </PlaylistsBox> */}
      </div>
    );
  }


}
export default App;