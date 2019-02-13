import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import Landing from '../Landing';
import Artists from '../Artists';

import * as ROUTES from '../../constants/routes';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="container">
          <Navigation />
          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route exact path={ROUTES.ARTISTS} component={Artists} />
        </div>
      </Router>
    );
  }
}

export default App;
