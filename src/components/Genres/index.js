import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class Genres extends Component {
  state = {
    genres: null
  };

  componentDidMount() {
    fetch('http://ec2-3-94-103-70.compute-1.amazonaws.com:8081/genres')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ genres: responseJson.body.records });
      });
  }

  render() {
    const { genres } = this.state;

    return (
      <div>
        {genres
          ? <GenresList genres={genres} />
          : null
        }
      </div>
    );
  }
}

// const SongsList = (props) => {
//   if (props.selectedAlbum) {
//     return (
//       <div>
//         {props.songs.filter(song => song.split('/')[0] + '/' + song.split('/')[1] === props.selectedAlbum)
//           .map(song => 
//           <div key={song}>
//             <Button
//               onClick={() => props.onClickSong(song)}
//             >
//               {song.split('/')[2]}
//             </Button>
//             <Sound
//               url={"https://s3.amazonaws.com/testy-tester-351541531532/" + song}
//               playStatus={props.selectedSong === song ? Sound.status.PLAYING : Sound.status.STOPPED}
//             />
//           </div>
//           )
//         }
//       </div>
//     );
//   } else {
//     return null;
//   }
// }

const GenresList = ({ genres }) => {
  return (
    <div>
      {genres.map(genre =>
        <Link
          to={'genre/:' + genre}
          key={genre}
        >
          <Button>
            {genre}
          </Button>
        </Link>
      )}
    </div>
  );
}

export default withRouter(Genres);