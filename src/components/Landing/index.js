import React, { Component } from 'react';
import './styles.css';
import { withRouter } from 'react-router-dom';
import firebase, { GoogleAuthProvider } from '../Firebase';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import * as ROUTES from '../../constants/routes';

class Landing extends Component {
  state = {
    error: ''
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onGoogleButton(event) {
    event.preventDefault();

    firebase
    .auth()
    .signInWithPopup(GoogleAuthProvider)
    .then(({ user }) => {
      axios.post('http://ec2-54-89-244-138.compute-1.amazonaws.com:8081/save-user', { id: user.uid, name: user.displayName, email: user.email });
      this.props.history.push(ROUTES.GENRES);
    })
    .catch(error => {
      this.setState({ error });
    })
  }

  render() {
    const {
      error
    } = this.state;

    return (
      <div className="landingContainer">
        <div className ="authContainer">

          <Typography>
            Welcome to Spooterfy
          </Typography>
          
          <Button onClick={this.onGoogleButton.bind(this)} variant="outlined">Sign In With Google</Button>

          {error && <p>{error.message}</p>}
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
