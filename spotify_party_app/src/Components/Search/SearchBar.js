import React, { Component } from 'react'; 
import FormControl from 'react-bootstrap/FormControl'; 
import Form from 'react-bootstrap/Form'; 
import Button  from 'react-bootstrap/Button'; 
import axios from 'axios';


class SearchBar extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            songs: [],
            artists: [],
            album_covers: [],
            song_uri: [], 
        };
        this.search = this.search.bind(this); 
    }

    handleSearch = (search) => {
        this.setState({search: search.target.value})
    }

    songCallback = () => {
      this.props.songCallback(this.state.songs, this.state.artists, this.state.album_covers, this.state.song_uri);
    }

    search() {
        let config = {
          headers: {
            'Authorization': '' + this.props.token_type + " " + this.props.access_token
          },
        }
        var songs = [];
        var artists = []; 
        var album_covers = [];
        var song_uri = [];
        var encode = encodeURI(this.state.search); 
        axios.get("https://api.spotify.com/v1/search?q=" + encode + "&type=track", config)
        .then((response) => { 
          if(response != null) {
            for(var x=0; x<response.data.tracks.items.length; x++) {
                songs.push(response.data.tracks.items[x].name);
                artists.push(response.data.tracks.items[x].artists[0].name);
                album_covers.push(response.data.tracks.items[x].album.images[0].url);
                song_uri.push(response.data.tracks.items[x].uri); 
            }
            this.setState({songs : songs,
                artists : artists,
                album_covers : album_covers,
                song_uri : song_uri
            }, this.songCallback)
          }     
        })
      }
    

    render() {
        return (
            <div> 
                <Form inline>
                <FormControl onChange={this.handleSearch} type="text" placeholder="Search" className="mr-sm-2"/>
                {this.props.access_token && (<Button onClick={this.search} > Search </Button>)}
                </Form>
            </div> 
            
        );
    }
}
export default SearchBar; 