import React from 'react';
import { Link } from 'react-router';

class Artist extends React.Component {
  componentDidMount() {
    this.props.selectArtist(this.props.params.artistId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.artistId !== nextProps.params.artistId) {
      this.props.selectArtist(nextProps.params.artistId);
    }
  }

  render() {
    const { selectedArtist, children, currentSong } = this.props;

    return (
      <div>
        <h3>{ selectedArtist.name }</h3>
        <ul className="nav nav-tabs">
          <li><Link to={`/artists/${selectedArtist.id}/albums`}>ALBUMS</Link></li>
          <li><Link to={`/artists/${selectedArtist.id}/songs`}>SONGS</Link></li>
        </ul>
        {
          children && React.cloneElement(children, {
            // ALBUMS
            albums: selectedArtist.albums,

            // SONGS
            songs: selectedArtist.songs,
            currentSong: currentSong,
          })
        }
      </div>
    );
  }
}

export default Artist;
