import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AddSongBtn from "./AddSongBtn";
import "./SongList.css";

class SongList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist_id: ""
        };
    }

    handlePlaylistId = id => {
        this.setState({
            playlist_id: id
        });
    };

    render() {
        var songs = [];
        for (var x = 0; x < this.props.songs.length; x++) {
            songs.push(
                <div>
                    <Card key={x}>
                        <Card.Header>
                            {this.props.songs[x]} - {this.props.artists[x]} -{" "}
                            {this.props.token_type}{" "}
                            <img src={this.props.album_covers[x]} height="100" width="100" />
                            <AddSongBtn
                                song_uri={this.props.song_uri}
                                playlists_name={this.props.playlists_name}
                                songName={this.props.songs[x]}
                                playlists_id={this.props.playlists_id}
                                access_token={this.props.access_token}
                                token_type={this.props.token_type}
                            ></AddSongBtn>
                        </Card.Header>
                    </Card>
                </div>
            );
        }
        return <Accordion defaultActiveKey="0">{songs}</Accordion>;
    }
}
export default SongList;
