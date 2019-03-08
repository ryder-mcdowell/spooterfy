import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Sound from 'react-sound';

import * as ROUTES from '../../constants/routes';

class Artist extends Component {
  state = {
    albums: {},
    selectedSong: null
  };

  componentDidMount() {
    const { match } = this.props;

    fetch('http://ec2-54-89-244-138.compute-1.amazonaws.com:8081/albums/for/artist?artist=' + match.params.artist.replace(':', ''))
      .then(response => response.json())
      .then(responseJson => {

        const albums = responseJson.body.records;

        albums.forEach(album => {
          fetch('http://ec2-54-89-244-138.compute-1.amazonaws.com:8081/songs/for/album?album=' + album)
            .then(response => response.json())
            .then(responseJson => {

              const songs = responseJson.body.records;

              songs.forEach(song => {
                fetch('http://ec2-54-89-244-138.compute-1.amazonaws.com:8081/song?song=' + song)
                  .then(response => response.json())
                  .then(responseJson => {

                    const url = responseJson.body.records;

                    const albums = this.state.albums;
                    if (albums[album]) {
                      albums[album].push({ name: song, url: url });
                    } else {
                      albums[album] = [{name: song, url: url }];
                    }

                    this.setState({ albums });  
                  });
              });
            });
        });
      });
  }

  onClickSong(song) {
    this.setState({ selectedSong: song });
  }

  render() {
    const {
      albums,
      selectedSong
    } = this.state;
    const { match } = this.props;    

    return (
      <div>
        {match.params.artist.replace(':', '')}
        <br /><br />
        <Typography>
          Albums:
        </Typography>
        <br />
        {Object.keys(albums).length > 0
          ? <AlbumsList
              albums={albums}
              onClickSong={this.onClickSong.bind(this)}
              selectedSong={selectedSong}
            />
          : null
        }
      </div>
    );
  }
}

const AlbumsList = ({ albums, onClickSong, selectedSong }) => {
    return (
      <div>
        {Object.keys(albums).map(album =>
          <div key={album}>
            <Typography>
              {album}
            </Typography>
            <SongsList
              songs={albums[album]}
              onClickSong={onClickSong}
              selectedSong={selectedSong}
            />
          </div>
        )}
        <br />
      </div>
    );
}

const SongsList = ({ songs, onClickSong, selectedSong }) => {
  if (songs && songs.length > 0) {
    return (
      <div>
        {songs.map(song =>
          <div key={song.name}>
            <Button onClick={() => onClickSong(song.name)}>
              {song.name}
            </Button>
            <Sound
              url={song.url}
              playStatus={selectedSong === song.name ? Sound.status.PLAYING : Sound.status.STOPPED}
            />
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
}

export default withRouter(Artist);