import React, { Component } from 'react';
import axios from 'axios';

import initialState from '../initialState';
import AUDIO from '../audio';

import Albums from '../components/Albums.js';
import Album from '../components/Album';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';

import { convertAlbum, convertAlbums, skip, convertSongs, convertSong } from '../utils';

export default class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = initialState;

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.selectAlbum = this.selectAlbum.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
    this.postNewPlaylist = this.postNewPlaylist.bind(this);
    this.getPlaylist = this.getPlaylist.bind(this);
  }

  componentDidMount () {
    const fetchAlbums = axios
      .get('/api/albums/')
      .then(res => res.data);
    const fetchArtists = axios
      .get('/api/artists')
      .then(res => res.data);
    const fetchPlaylists = axios
      .get('/api/playlists')
      .then(res => res.data);

    Promise.all([fetchAlbums, fetchArtists, fetchPlaylists])
      .then(([albums, artists, playlists]) => {
        this.onLoad(convertAlbums(albums), artists, playlists);
      });

    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }

  postNewPlaylist (npv) {
      // post new playlist
      axios
          .post('/api/playlists', {name: npv})
          .then(response =>
              this.setState({
                  playlists : [...this.state.playlists, response.data]
              })
          )
          .catch(console.error.bind(console));
  }

  getPlaylist (playlistId) {
    axios.get(`/api/playlists/${playlistId}`)
    .then(res => {
      res.data.songs = res.data.songs.map(convertSong)
      this.setState({ selectedPlaylist: res.data })
      // console.log("res.data in getPlaylist", res.data)
    })
    .catch(console.error.bind(console));
  }

  onLoad (albums, artists, playlists) {
    this.setState({
      albums: albums,
      artists: artists,
      playlists: playlists,
    });
  }

  play () {
    AUDIO.play();
    this.setState({ isPlaying: true });
  }

  pause () {
    AUDIO.pause();
    this.setState({ isPlaying: false });
  }

  load (currentSong, currentSongList) {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    this.setState({
      currentSong: currentSong,
      currentSongList: currentSongList
    });
  }

  startSong (song, list) {
    this.pause();
    this.load(song, list);
    this.play();
  }

  toggleOne (selectedSong, selectedSongList) {
    if (selectedSong.id !== this.state.currentSong.id)
      this.startSong(selectedSong, selectedSongList);
    else this.toggle();
  }

  toggle () {
    if (this.state.isPlaying) this.pause();
    else this.play();
  }

  next () {
    this.startSong(...skip(1, this.state));
  }

  prev () {
    this.startSong(...skip(-1, this.state));
  }

  setProgress (progress) {
    this.setState({ progress: progress });
  }

  selectAlbum (albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        selectedAlbum: convertAlbum(album)
      }));
  }

  selectArtist (artistId) {
    const uri = `/api/artists/${artistId}`;
    Promise.all([axios.get(uri), axios.get(`${uri}/albums`), axios.get(`${uri}/songs`)])
      .then(responses => responses.map(res => res.data))
      .then(([artist, albums, songs]) => {
        artist.albums = convertAlbums(albums);
        artist.songs = convertSongs(songs);
        this.setState({ selectedArtist: artist });
      });
  }

  render () {
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar
            deselectAlbum={this.deselectAlbum}
            playlists={this.state.playlists}
          />
        </div>
        <div className="col-xs-10">
        {
            this.props.children && React.cloneElement(this.props.children, {
                // ALBUMS PROPS
                albums: this.state.albums,

                // ALBUM (singular) PROPS
                selectAlbum: this.selectAlbum,
                album: this.state.selectedAlbum,
                currentSong: this.state.currentSong,
                isPlaying: this.state.isPlaying,
                toggleOne: this.toggleOne,

                // ARTISTS PROPS
                artists: this.state.artists,

                // ARTIST (singular) PROPS
                selectArtist: this.selectArtist,
                selectedArtist: this.state.selectedArtist,

                // NewPlaylistContainer
                postNewPlaylist: this.postNewPlaylist,

                //Playlist PROPS
                getPlaylist: this.getPlaylist,
                selectedPlaylist: this.state.selectedPlaylist,

            })
        }
        </div>
        <Player
          currentSong={this.state.currentSong}
          currentSongList={this.state.currentSongList}
          isPlaying={this.state.isPlaying}
          progress={this.state.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.toggle}
        />
      </div>
    );
  }
}
