import React, { Component } from "react";
import Image from 'react-bootstrap/Image';
import axios from 'axios';

class QRCode extends Component {

    constructor(props) {
        super(props); 

        this.state = {
            qr : '', 
        }

        this.createQR = this.createQR.bind(this); 
    }

    componentDidMount() {
        this.createQR(); 
    }

    createQR() {
        axios.get(`https://api.qrserver.com/v1/create-qr-code/?data=${this.props.url}&size=100x100`)
        .then(response => {
            if(response != null) {
                // console.log(response); 
                this.setState({qr : response.config.url})
            }
        })
    }

    render()   {
        return(
            <div>
                {this.state.qr && (<p> <Image src={this.state.qr} rounded /> </p>)}
            </div>
        );
    }
}

export default QRCode; 


