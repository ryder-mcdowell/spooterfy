import React, { Component } from 'react';
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

  onClickGenre() {
    //navigate
  }

  render() {
    const { genres } = this.state;

    return (
      <div>
        {genres
          ? <GenresList
              genres={genres}
              onClickGenre={this.onClickGenre.bind(this)}
            />
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

const GenresList = ({ genres, onClickGenre }) => {
  return (
    <div>
      {genres.map(genre => 
        <Button
          onClick={() => onClickGenre(genre)}
          key={genre}
        >
          {genre}
        </Button>
      )}
    </div>
  );
}

export default Genres;