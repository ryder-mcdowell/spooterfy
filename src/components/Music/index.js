import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

const ARTISTS = [
  'Red Hot Chili Peppers',
  'Stone Temple Pilots',
  'Led Zeppelin'
];

const ALBUMS = [
  'album 1',
  'album 2'
];

const SONGS = [
  'song 1',
  'song 2'
];

class Artists extends Component {
  state = {
    selectedArtist: null,
    selectedAlbum: null,
    selectedSong: null
  };

  onClickArtist(selectedArtist) {
    this.setState({
      selectedArtist
    });
  }

  onClickAlbum(selectedAlbum) {
    this.setState({
      selectedAlbum
    });
  }

  onClickSong(selectedSong) {
    this.setState({
      selectedSong
    });
  }

  render() {
    const {
      selectedArtist,
      selectedAlbum,
      selectedSong
    } = this.state;

    return (
      <div>
        <ArtistsList
          artists={ARTISTS}
          selectedArtist={selectedArtist}
          onClickArtist={this.onClickArtist.bind(this)}
        />
        <AlbumsList
          albums={ALBUMS}
          selectedArtist={selectedArtist}
          selectedAlbum={selectedAlbum}
          onClickAlbum={this.onClickAlbum.bind(this)}
        />
        <SongsList
          songs={SONGS}
          selectedArtist={selectedArtist}
          selectedAlbum={selectedAlbum}
          selectedSong={selectedSong}
          onClickSong={this.onClickSong.bind(this)}
        />
      </div>
    );
  }
}

const ArtistsList = (props) => {
  return (
    <div>
      {props.artists.map(artist => 
        <Button
          onClick={() => props.onClickArtist(artist)}
          key={artist}
        >
          {artist}
        </Button>
      )}
    </div>
  );
}

const AlbumsList = (props) => {
  if (props.selectedArtist) {
    return (
      <div>
        {props.albums.map(album => 
          <Button
            onClick={() => props.onClickAlbum(album)}
            key={album}
          >
            {album}
          </Button>
        )}
      </div>
    );
  } else {
    return null;
  }
}

const SongsList = (props) => {
  if (props.selectedAlbum) {
    return (
      <div>
        {props.songs.map(song => 
          <Button
            onClick={() => props.onClickSong(song)}
            key={song}
          >
            {song}
          </Button>
        )}
      </div>
    );
  } else {
    return null;
  }
}

export default Artists;