import React, {Component} from 'react';
import {ListGroupItem, Button, Glyphicon} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../index.css';

class SongDetails extends Component {
    
    render() {
        let songDetail = this.props.songs.find((value) => {
            return value.id === Number(this.props.match.params.songId);
        });
        let statusIcon;
        let nextAlbumDetail = `/${(songDetail.id + 1) % this.props.songs.length}`;

        //Conditions to set the play button on each song.
        if (Object.keys(this.props.currentSong).length === 0) {
            statusIcon = 'play';
        }
        else if (this.props.currentSong.id === songDetail.id) {
            statusIcon = this.props.statusIcon;
        }
        else {
            statusIcon = 'play';
        }

        return (
            <div className="divAlbum">
                <img className="detailAlbumArt" src={songDetail.art} alt="AlbumArt"/>
                <div className="detailAlbumInfo">
                    <ListGroupItem header={songDetail.title}>{songDetail.description}
                        <div>
                            <Button bsSize="small" onClick={(e) => this.props.playIt(e, songDetail)}>
                                <Glyphicon glyph={statusIcon}/>
                            </Button>
                        </div>
                    </ListGroupItem>
                </div>
                <div className="detailNextArrow">
                {/* Control to change the album detail info. */}
                <Link to={nextAlbumDetail} >
                    <Glyphicon glyph="chevron-right"/>
                </Link>
                </div>
            </div>
        )
    }
}

export default SongDetails;