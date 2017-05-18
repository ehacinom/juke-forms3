import React from 'react'
import Songs from './Songs'

class Playlist extends React.Component {
  constructor() {
    super()
  }

  componentDidMount () {
    this.props.getPlaylist(this.props.routeParams.playlistId)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.routeParams.playlistId !== nextProps.routeParams.playlistId ) {
      this.props.getPlaylist(nextProps.routeParams.playlistId)
    }
  }

  render () {
    const selectedPL = this.props.selectedPlaylist
    console.log("selectedPL in Playlist.js", selectedPL)
    return (
      <div>
        <h3>{ selectedPL.name }</h3>
        <Songs songs={selectedPL.songs} /> {/** Hooray for reusability! */}
        { selectedPL.songs && !selectedPL.songs.length && <small>No songs.</small> }
        <hr />
      </div>
    )
  }
}

export default Playlist
