import React from 'react';
import Songs from '../components/Songs';

class Album extends React.Component {
  componentDidMount() {
    this.props.selectAlbum(this.props.params.albumId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.albumId !== nextProps.params.albumId) {
      this.props.selectAlbum(nextProps.params.albumId);
    }
  }

  render() {
    const { album, currentSong, isPlaying, toggleOne } = this.props;

    return (
      <div className="album">
        <div>
          <h3>{ album.name }</h3>
          <img src={ album.imageUrl } className="img-thumbnail" />
        </div>
        <Songs
          songs={album.songs}
          currentSong={currentSong}
          isPlaying={isPlaying}
          toggleOne={toggleOne} />
      </div>
    );
  }
}

export default Album;
