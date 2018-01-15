import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {ListGroup, ListGroupItem,
        Button, Glyphicon} from 'react-bootstrap';

class SongsList extends Component {
    render() {
        let songlist = this.props.songs.map((value, i) => {
            let songlink = "/" + value.id;
            let statusIcon;

            //Conditions to set the play button on each song.
            if (Object.keys(this.props.currentSong).length === 0) {
                statusIcon = 'play';
            }
            else if (this.props.currentSong.id === value.id) {
                statusIcon = this.props.statusIcon;
            }
            else {
                statusIcon = 'play';
            }

                 
        return (
            <div>
                <Link to={songlink} >
                    <ListGroupItem header={value.title} key={value.id}>
                        {value.artist}
                        <div>
                            <Button bsSize="small" onClick={(e) => this.props.playIt(e, value)}>
                                <Glyphicon glyph={statusIcon}/>
                            </Button>    
                        </div>
                        <img className="listAlbumArt" src={value.art} alt="AlbumArt"/>
                    </ListGroupItem>
                </Link>
            </div>
        )
        })
        
        return (
            <div>
                <ListGroup>
                    {songlist}
                </ListGroup>
            </div>
        )
    }
}

export default SongsList;