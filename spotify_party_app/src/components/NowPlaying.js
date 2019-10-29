import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class NowPlaying extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            song: '',
            album: '', 
        }
        this.getNowPlaying = this.getNowPlaying.bind(this); 
    }
    // componentDidMount() {
    // }
    getNowPlaying() {
        let config = {
            headers: {
                'Authorization': '' + this.props.token_type + " " + this.props.access_token
            },
        }
        axios.get("https://api.spotify.com/v1/me/player/currently-playing", config)
        .then(response => this.setState({song: response.data.item.name,
            album : response.data.item.album.images[0].url, 
        }))
    }
    render()
        {
            return (
                <div>
                   <Button onClick={this.getNowPlaying}> Now Playing </Button>
                    <div>
                        Now Playing: {this.state.song}
                    </div>
                    <div>
                    <img src={this.state.album} style={{ height: 150 }}/>
                  </div> 
                </div>
                
                )
        }   
}

export default NowPlaying; 