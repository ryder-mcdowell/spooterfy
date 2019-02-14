import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Sound from 'react-sound';

class Artists extends Component {
  state = {
    artists: null,
    albums: null,
    songs: null,
    selectedArtist: null,
    selectedAlbum: null,
    selectedSong: null
  };

  componentDidMount() {
    fetch('http://ec2-3-95-218-160.compute-1.amazonaws.com:8081/music')
    .then(response => response.json())
    .then(responseJson => {
      let artists = [];
      let albums = [];
      let songs = [];
      responseJson.body.records.forEach(record => {
        let key = record.Key;
        key = key.replace(/\/$/, '');
        if (key.split('/').length === 3) {
          songs.push(key);
        } else if (key.split('/').length === 2) {
          albums.push(key);
        } else if (key.split('/').length === 1) {
          artists.push(key);
        }
      });
      this.setState({
        artists,
        albums,
        songs
      });
    })
  }

  onClickArtist(selectedArtist) {
    this.setState({
      selectedArtist,
      selectedAlbum: null,
      selectedSong: null
    });
  }

  onClickAlbum(selectedAlbum) {
    this.setState({
      selectedAlbum,
      selectedSong: null
    });
  }

  onClickSong(selectedSong) {
    this.setState({
      selectedSong
    });
  }

  render() {
    const {
      artists,
      albums,
      songs,
      selectedArtist,
      selectedAlbum,
      selectedSong
    } = this.state;    

    return (
      <div>
        {artists
          ? <ArtistsList
              artists={artists}
              selectedArtist={selectedArtist}
              onClickArtist={this.onClickArtist.bind(this)}
            />
          : null
        }
        {albums
          ? <AlbumsList
              albums={albums}
              selectedArtist={selectedArtist}
              selectedAlbum={selectedAlbum}
              onClickAlbum={this.onClickAlbum.bind(this)}
            />
          : null
        }
        {songs
          ? <SongsList
              songs={songs}
              selectedArtist={selectedArtist}
              selectedAlbum={selectedAlbum}
              selectedSong={selectedSong}
              onClickSong={this.onClickSong.bind(this)}
            />
          : null
        }
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
        {props.albums.filter(album => album.split('/')[0] === props.selectedArtist)
          .map(album => 
            <Button
              onClick={() => props.onClickAlbum(album)}
              key={album}
            >
              {album.split('/')[1]}
            </Button>
          )
        }
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
        {props.songs.filter(song => song.split('/')[0] + '/' + song.split('/')[1] === props.selectedAlbum)
          .map(song => 
          <div key={song}>
            <Button
              onClick={() => props.onClickSong(song)}
            >
              {song.split('/')[2]}
            </Button>
            <Sound
              url={"https://s3.amazonaws.com/testy-tester-351541531532/" + song}
              playStatus={props.selectedSong === song ? Sound.status.PLAYING : Sound.status.STOPPED}
            />
          </div>
          )
        }
      </div>
    );
  } else {
    return null;
  }
}

export default Artists;