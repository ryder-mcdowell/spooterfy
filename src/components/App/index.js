import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import firebase from '../Firebase';
import Navigation from '../Navigation';
import Landing from '../Landing';
import Genres from '../Genres';
import GenreArtists from '../GenreArtists';
import Artist from '../Artist';

import * as ROUTES from '../../constants/routes';

class App extends Component {
  state = { authenticated: false };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(authenticated => {
      authenticated
        ? this.setState({ authenticated: true })
        : this.setState({ authenticated: false })
    });
  }

  render() {
    const { authenticated } = this.state;
    return (
      <Router>
        <div className="container">
          <Navigation authenticated={authenticated} />

          <Switch>
            <Route exact path={ROUTES.LANDING} render={() => authenticated ? <Redirect to={ROUTES.GENRES} /> : <Landing />} />
            <ProtectedRoute exact path={ROUTES.GENRES} component={Genres} authenticated={authenticated} />
            <ProtectedRoute exact path={ROUTES.GENRE_ARTISTS} component={GenreArtists} authenticated={authenticated} />
            <ProtectedRoute exact path={ROUTES.ARTIST} component={Artist} authenticated={authenticated} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
