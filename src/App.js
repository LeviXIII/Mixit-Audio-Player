import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import {Jumbotron} from 'react-bootstrap';

import AudioPlayer from './components/AudioPlayer';
import SongsList from './components/SongsList';
import SongDetails from './components/SongDetails';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentSong: {},
      isPlaying: false,
      statusIcon: 'play',
      currentTime: 0,
      songDuration: 0,
      loop: false,
    }

    this.audioPlayer; //Used for ref for audio player.
  }

  componentDidUpdate() {
    if (this.state.isPlaying) {
      if (this.audioPlayer.ended === true && this.state.loop === false) {
        this.nextSong();
      }
      this.audioPlayer.play();
    }
    else {
      this.audioPlayer.pause();
    }
  }

  //To be implemented later.
  seek = (e) => {
    let x = e.clientX;
    let y = e.clientY;
    let coor = "Coordinates: (" + x + "," + y + ")";
  }

  //Control for the next button.
  nextSong = () => {
    let currentSong = this.state.currentSong;
    
    if (!this.props.isPlaying && Object.keys(currentSong).length === 0) {
      currentSong = this.props.songs[0];
    }

    let next = (currentSong.id + 1) % this.props.songs.length;

    this.setState({
      currentSong: this.props.songs[next],
    })
  }

  //Control for the back button.
  prevSong = () => {
    let prev;

    if (this.state.currentSong.id - 1 < 0) {
      prev = this.props.songs.length - 1;
    }
    else {
      prev = this.state.currentSong.id - 1;
    }
    this.setState({
      currentSong: this.props.songs[prev],
    })

  }

  loopSong = () => {
    let loop = this.state.loop === true ? false : true;
    this.setState({ loop: loop })
  }

  //Control for all the play buttons. 
  playIt = (e, song) => {
    e.preventDefault();
    //Stops bootstrap button from refreshing the page.
    if (this.state.currentSong.source !== song.source) {
      this.setState({
        currentSong: song,
        isPlaying: true,
        statusIcon: 'pause',
        
      })
    }
    else {
      if (this.state.statusIcon === 'play') {
        this.setState({ statusIcon: 'pause', isPlaying: true });
      }
      else {
        this.setState({ statusIcon: 'play', isPlaying: false });
      }
    }

    //Makes the progress bar tick and update every second.
    setInterval(() => {
      this.setState({
        currentTime: this.audioPlayer.currentTime,
        songDuration: this.audioPlayer.duration,
      });
    }, 1000);
  }

  render() {
    return (
      <div className="container background">
      <div className="App">
        <Link to="/">  
          <Jumbotron>
            <h1>Mixit</h1>
            <p className="lead">Your Songs, Your Way</p>
          </Jumbotron>
        </Link>
        <Route exact path="/" render={() => 
          <SongsList  songs={this.props.songs}
                      playIt={this.playIt}
                      statusIcon={this.state.statusIcon}
                      currentSong={this.state.currentSong}/>}
          />
        <Route path='/:songId' render={({match}) =>
          <SongDetails  songs={this.props.songs}
                        match={match}
                        playIt={this.playIt}
                        statusIcon={this.state.statusIcon}
                        currentSong={this.state.currentSong}/>}
          />
        <audio  id="songPlayer" ref={(audioPlayer) => {this.audioPlayer = audioPlayer}} 
                src={this.state.currentSong.source} loop={this.state.loop} type="audio/mpeg">
        </audio>
      </div>
      <AudioPlayer songs={this.props.songs}
                    playIt={this.playIt}
                    nextSong={this.nextSong}
                    prevSong={this.prevSong}
                    seek={this.seek}
                    loopSong={this.loopSong}
                    isPlaying={this.state.isPlaying}
                    currentSong={this.state.currentSong}
                    statusIcon={this.state.statusIcon}
                    currentTime={this.state.currentTime}
                    songDuration={this.state.songDuration}
                    loop={this.state.loop}
                    className="playerPosition"
      />
      </div>
    );
  }
}

export default App;
