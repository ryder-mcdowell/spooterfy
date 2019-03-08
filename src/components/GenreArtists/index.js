import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class GenreArtists extends Component {
  state = {
    artists: null
  };

  componentDidMount() {
    const { match } = this.props;

    fetch('http://ec2-54-89-244-138.compute-1.amazonaws.com:8081/artists/for/genre?genre=' + match.params.genre.replace(':', ''))
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ artists: responseJson.body.records });
      });
  }

  render() {
    const { artists } = this.state;

    return (
      <div>
        <Typography>
          Artists:
        </Typography>
        {artists
          ? <ArtistsList artists={artists} />
          : null
        }
      </div>
    );
  }
}

const ArtistsList = ({ artists }) => {
  return (
    <div>
      {artists.map(artist => 
        <div key={artist}>
          <Link to={'/artist/:' + artist}>
            <Button>
              {artist}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default withRouter(GenreArtists);