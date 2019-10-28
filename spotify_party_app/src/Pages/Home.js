import React, { Component } from 'react'; 
class Home extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            access_token: '', 
        }
    }

    componentDidMount() {
        this.setState({
            access_token : this.props.access_token
        })
    }

    render() {
        return (
            <div>
                <h1> Home  {this.props.access_token} </h1>
            </div> 
        ); 
    }
}
export default Home; 