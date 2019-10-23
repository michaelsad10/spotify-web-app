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
        this.state = {
            input: '', 
            artists: '', 
            songs: '', 
            loggedIn: false, 
            search: '',
        };
    
        this.sendSongs = this.sendSongs.bind(this); 
    }

    handleSelect = (evt) => {
        this.setState({
            selected: evt
        });
    }

    handleSearch = (search) => {
        console.log(search.target.value); 
        this.setState({input: search.target.value})
    }

    sendSongs() { // Need to call this after someone searches a song 
        this.props.parentCallback("hello");
        // this.props.parentCallback(this.state.songs);
    }
    search() {
        let config = {
          headers: {
            'Authorization': '' + this.state.token_type + " " + this.state.access_token
          },
        }
        axios.get("https://api.spotify.com/v1/search?q=NO%20BYSTANDERS&type=track", config)
        .then((response) => { 
          if(response != null) {
            this.setState({songs: response})
          }     
        })
      }



    

    render() {
        return (
            <div> 
                <Form>
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
                <Button onClick={this.sendSongs} > Search </Button>
            </div> 
            
        );
    }
}
export default SearchBar; 