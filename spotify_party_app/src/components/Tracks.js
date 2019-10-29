import React, { Component } from "react";
import axios from 'axios';

class Tracks extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            songs: [], 
            artist: [], 
        }
        this.getSongs = this.getSongs.bind(this); 
    }
    componentDidMount() {
        this.getSongs(); 
    }

    getSongs() {
        let config = {
            headers: {
                'Authorization': '' + this.props.token_type + " " + this.props.access_token
            }
        }
        var song = []; 
        var artist = []; 
        axios.get(`${this.props.tracks}`, config)
        .then(response => {
            if(response != null) {
                if(response.data.items.length >= 5) {
                    for(var x=0; x<5; x++) {
                        song.push(response.data.items[x].track.name);
                        artist.push(response.data.items[x].track.artists[0].name)
                    }
                    this.setState({songs : song });
                    this.setState({artist : artist})
                }
            }
        })
    }
    render() {
        var songs = []; 
        if(this.state.songs.length >= 5 && this.state.artist.length >= 5) {
            for(var x=0; x<5; x++) {
                songs.push(
                    <p key={x}> {this.state.songs[x]} - {this.state.artist[x]} </p>
                )
            }
        }
        return(
            
            <div>
                {songs}
            </div>   
        );
    }
}

export default Tracks; 