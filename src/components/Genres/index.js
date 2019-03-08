import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Genres extends Component {
  state = {
    genres: null
  };

  componentDidMount() {
    fetch('http://ec2-54-89-244-138.compute-1.amazonaws.com:8081/genres')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ genres: responseJson.body.records });
      });
  }

  render() {
    const { genres } = this.state;

    return (
      <div>
        <Typography>
          Genres:
        </Typography>
        {genres
          ? <GenresList genres={genres} />
          : null
        }
      </div>
    );
  }
}

const GenresList = ({ genres }) => {
  return (
    <div>
      {genres.map(genre =>
        <div key={genre}>
          <Link
            to={'/genre/:' + genre}
          >
            <Button>
              {genre}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default withRouter(Genres);