import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'; 

class UserPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            qr: '',
            playlists: []
        }
        this.getPlaylists = this.getPlaylists.bind(this);
        this.getQR = this.getQR.bind(this); 
    }
    componentDidMount() {
        this.getPlaylists();
    }
    getPlaylists() {
        let config = {
            headers: {
                'Authorization': '' + this.props.token_type + " " + this.props.access_token
            }
        }
        axios.get(`https://api.spotify.com/v1/users/${this.props.user_id}/playlists`, config)
            .then(response => this.setState({ data: response.data }, this.getQR(response.data.items)))
            
    }

    getQR(urls) {
        var Arr = []; 
        for(var x=0; x<urls.length; x++) {
            axios.get(`https://api.qrserver.com/v1/create-qr-code/?data=${urls[x].external_urls.spotify}&size=100x100`)
            .then(response => {
                if(response != null) {
                    Arr.push(response);   
                }
                if(Arr.length == urls.length) {
                    console.log(Arr); 
                    this.setState({qr : Arr}); 
                }
            })
        }
       
    }

    render() {
        if (this.state.data != '' && this.state.qr.length == this.state.data.items.length) {
            var playlists = [];
            for (var x = 0; x < this.state.data.items.length;  x++) {
                var qrUrl = this.state.qr[x].config.url;
                playlists.push(
                    <Card key={x}>
                        <Card.Header>
                            <Accordion.Toggle as={Button} eventKey={x}>
                                {this.state.data.items[x].name}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={x}>
                            <Card.Body>
                                <Image src={qrUrl} rounded/> 
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                );
            }
        }

        return (
            <Accordion defaultActiveKey="0">
                {playlists}
            </Accordion>
        );
    }
}
export default UserPlaylist; 