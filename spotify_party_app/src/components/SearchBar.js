import React, { Component } from 'react'; 
import FormControl from 'react-bootstrap/FormControl'; 
import Form from 'react-bootstrap/Form'; 
import Button  from 'react-bootstrap/Button'; 
import axios from 'axios';


class SearchBar extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            songs: '', 
            loggedIn: false, 
            search: '',
            listOfSongs: '', 
            listOfArtists: [], 
            information: '', 
        };
        this.sendSongs = this.sendSongs.bind(this); 
        this.search = this.search.bind(this); 
        this.getInformation = this.getInformation.bind(this); 
    }

    handleSearch = (search) => {
        this.setState({search: search.target.value})
    }

    sendSongs() {   
        this.props.parentCallBack(this.state.listOfSongs, this.state.listOfArtists); 
    }

    search() {
        let config = {
          headers: {
            'Authorization': '' + this.props.token_type + " " + this.props.access_token
          },
        }
        var encode = encodeURI(this.state.search); 
        axios.get("https://api.spotify.com/v1/search?q=" + encode + "&type=track", config)
        .then((response) => { 
          if(response != null) {
            console.log(response); 
            this.setState({information: response.data.tracks.items})
            this.getInformation(); 
            this.sendSongs(); 
          }     
        })
      }

    
    getInformation() {
        var songArr = []; 
        var artistArr = []; 
        for(var x=0; x<this.state.information.length; x++) {
            songArr.push(this.state.information[x].name);  
            artistArr.push(this.state.information[x].artists[0].name)
            this.setState({listOfSongs : songArr})
            this.setState({listOfArtists: artistArr})
        }
    }

// information = response.data.tracks.items is an array of all the artists 
// songs = information[x].name 
// artist = information.artists[0].name 


    

    render() {
        return (
            <div> 
                <Form>
                <FormControl onChange={this.handleSearch} type="text" placeholder="Search" className="mr-sm-2"/>
                </Form>
                <Button onClick={this.search} > Search </Button>
            </div> 
            
        );
    }
}
export default SearchBar; 