import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import './index.css';

function Song(source, title, artist, description, art, id) {
  this.source = source;
  this.title = title;
  this.artist = artist;
  this.description = description;
  this.art = art;
  this.id = id;
}

const songs = [
  new Song('/Atchafalaya.mp3', 'Atchafalaya', 'Snarky Puppy', 'Synchronized horns get the groove going with this upbeat song', '/Images/snarkyAlbumArt.jpg', 0),
  new Song('/Invisible.mp3', 'Invisible', 'Lisa McClendon', 'A message to those who follow Christ: He must increase, I must decrease', '/Images/lisaAlbumArt.jpg', 1),
  new Song('/Let_It_Ride.mp3', 'Let It Ride', 'Robert Glasper feat. Norah Jones', 'A smooth ride lead by an infectious beat and accented by a rhodes piano and Norah Jones', '/Images/robertAlbumArt.jpg', 2)
]

ReactDOM.render((
  <Router>
    <App songs={songs} />
  </Router>
),document.getElementById('root'));
