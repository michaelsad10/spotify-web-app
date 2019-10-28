import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import axios from 'axios';

class UserId extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            data: '', 
        }
        this.sendUserId = this.sendUserId.bind(this); 
    }

    componentDidMount() {
        this.getUserId(); 
    }

    sendUserId(id) {
        this.props.sendId(id); 
    }

    getUserId() {
        let config = {
            headers: {
                'Authorization': '' + this.props.token_type + " " + this.props.access_token
            }
        }
        axios.get("https://api.spotify.com/v1/me", config)
        .then(response => this.sendUserId(response.data.id))
    }

    render(){
        return (
            null
        );
    }
}
export default UserId; 