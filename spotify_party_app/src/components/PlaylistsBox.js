import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup"; 
import Button from "react-bootstrap/Button";
import axios from 'axios';

class PlaylistsBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            playlists: '', 
        };
        this.getUserPlaylist = this.getUserPlaylist.bind(this); 
    }
    getUserPlaylist() {
            var playlistsList = {}; 
            let config = {
              headers: {
                'Authorization': '' + this.props.token_type + " " + this.props.access_token
              },
            }
            axios.get("https://api.spotify.com/v1/me/playlists", config)
            .then((response) => { 
              if(response != null) {
                var playlists_href = response.data.items; 
                for(var x = 0; x < playlists_href.length; x++) {
                    playlistsList[playlists_href[x].name] = playlists_href[x].tracks.href;
                }
                this.setState({playlists: playlistsList});
                // console.log(this.state.playlists); 
              }     
            })
    }
    render() {
        var temp = []; 
        let keys = Object.keys(this.state.playlists); 
        for(var x=0; x<keys.length; x++) {
          temp.push(
          <ListGroup.Item key={keys[x]} >
            <a href={this.state.playlists[keys[x]]}> {keys[x]} </a>
          </ListGroup.Item>
          )
        }
        // reroute them to the playlist page with all the songs 
        return (
            <div>
              <ListGroup>
                {temp}
              </ListGroup>
              <Button onClick={this.getUserPlaylist}> Get Spotify Playlists </Button>
            </div>
        );
    }
}

export default PlaylistsBox; 