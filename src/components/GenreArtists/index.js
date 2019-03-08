import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import * as ROUTES from '../../constants/routes';

class GenreArtists extends Component {
  state = {
    artists: null
  };

  componentDidMount() {
    const { match } = this.props;

    fetch('http://ec2-3-94-103-70.compute-1.amazonaws.com:8081/artists/for/genre?genre=' + match.params.genre.replace(':', ''))
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ artists: responseJson.body.records });
      });
  }

  render() {
    const { artists } = this.state;

    return (
      <div>
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
        <Link to={ROUTES.GENRE_ARTISTS} key={artist}>
          <Button>
            {artist}
          </Button>
        </Link>
      )}
    </div>
  );
}

export default withRouter(GenreArtists);