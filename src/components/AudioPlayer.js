import React, {Component} from 'react';
import {Button, Glyphicon, ProgressBar} from 'react-bootstrap';

class AudioPlayer extends Component {
    
    player(e) {
        //Checks for an empty object to default to first song in list.
        if (!this.props.isPlaying && Object.keys(this.props.currentSong).length === 0) {
            this.props.playIt(e, this.props.songs[0]);
        }
        else {
            let songDetail = this.props.songs.find((value) => {
                return value.source === this.props.currentSong.source;
            });
            this.props.playIt(e, songDetail);
        }
    }
    
    render() {
        return (
            <div className="playerPosition">
                <div>
                    <p className="centerAlignPlayer">{this.props.currentSong.artist} - {this.props.currentSong.title}</p>
                    <span className="centerAlignPlayer">
                    <Button className="noBorder" bsSize="xsmall" active={this.props.loop}
                        onClick={(e) => this.props.loopSong(e)}> 
                        <Glyphicon glyph="repeat"/>
                    </Button>
                    <Button className="noBorder" bsSize="small" onClick={this.props.prevSong}> 
                        <Glyphicon glyph="step-backward"/>
                    </Button>
                    <Button className="noBorder" bsSize="large" onClick={(e) => {this.player(e)}}> 
                        <Glyphicon glyph={this.props.statusIcon}/>
                    </Button>
                    <Button className="noBorder" bsSize="small" onClick={this.props.nextSong}> 
                        <Glyphicon glyph="step-forward"/>
                    </Button>
                    </span>
                    <div className="progress">
                        <ProgressBar max={this.props.songDuration} now={this.props.currentTime} onClick={(e) => {this.props.seek(e)}}/>
                    </div>
                </div>      
            </div>
        )
    }
}

export default AudioPlayer;