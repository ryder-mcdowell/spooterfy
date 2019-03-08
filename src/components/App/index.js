import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import firebase from '../Firebase';
import Navigation from '../Navigation';
import Landing from '../Landing';
import Music from '../Music';

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
            <Route exact path={ROUTES.LANDING} render={() => authenticated ? <Redirect to={ROUTES.MUSIC} /> : <Landing />} />
            <ProtectedRoute exact path={ROUTES.MUSIC} component={Music} authenticated={authenticated} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
