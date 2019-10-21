import React, { Component } from 'react'; 
import { Input } from '@chakra-ui/core'; 
import FormControl from 'react-bootstrap/FormControl'; 
import Form from 'react-bootstrap/Form'; 
import Dropdown from 'react-bootstrap/Dropdown'; 
import Button  from 'react-bootstrap/Button'; 
import Spotify from 'spotify-web-api-js'; 
import axios from 'axios';


const spotifyWebApi = new Spotify(); 

class SearchBar extends Component {

    constructor(props) {
        super(props); 
        const params = this.getHashParams(); 
        this.state = {
            name: "michael",
            selected: 'Options', 
            loggedIn: params.access_token ? true : false, 
            nowPlaying: {
                name: 'Not Checked',
                image: '', 
            },
            input: '', 
            artists: '', 
            songs: '', 
        };
        if (params.access_token) {
            spotifyWebApi.setAccessToken(params.access_token); 
        }
    }
    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
      }

    handleSelect = (evt) => {
        this.setState({
            selected: evt
        });
    }

    getNowPlaying = () => {
        spotifyWebApi.getMyCurrentPlaybackState()
        .then((response) => {
            this.setState({
                nowPlaying: {
                    name: response.item.name, 
                    image: response.item.album.images[0].url
                }
            })
        })
    }
    
    search = () => {  
        // spotifyWebApi.searchArtists(this.state.input)
        // .then((response) => {
        //     this.setState({
        //         artists: response
        //     })
        //     console.log(this.state.artists); 
        // })

        // spotifyWebApi.searchTracks(this.state.input)
        // .then((response) => {
        //     this.setState({
        //         artists: response
        //     })
        //     console.log(this.state.artists); 
        // })
        axios.get('https://api.spotify.com/v1/search?q=name:SteadyMobbin&type=track')
        .then((res) => { 
            this.setState({artists: res})
            console.log(this.state.artists);
         })
        }


    handleSearch = (search) => {
        console.log(search.target.value); 
        this.setState({input: search.target.value})
    }


    

    

    render() {
        return (
            <div> 
                <a href="http://localhost:8888/">
                <button>  Login with Spotify </button> 
                </a>
                <Form>
                {/* <input type="string" onChange={this.handleSearch} value={this.state.search}/> */}
                <FormControl onChange={this.handleSearch} value={this.state.search} type="text" placeholder="Search" className="mr-sm-2"/>
                {/* <Dropdown onSelect={this.handleSelect}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {this.state.selected}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="Artist"> Artist </Dropdown.Item>
                        <Dropdown.Item eventKey="Song"> Song </Dropdown.Item>
                        <Dropdown.Item eventKey="Playlist"> Playlist </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
            </Form>
            {/* <Button onClick={this.search(this.state.selected)} variant="primary"> Search </Button> */}
            {/* <Button onClick={this.getNowPlaying} variant="primary"> Check Now! </Button>
            <h1> {this.state.nowPlaying.name } </h1> 
            <img src={this.state.nowPlaying.image}/> */}
            <button onClick={this.login}> search </button>
                </div> 
            
        );
    }
}
export default SearchBar; 