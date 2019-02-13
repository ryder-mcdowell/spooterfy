import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import * as ROUTES from '../../constants/routes';

class Landing extends Component {
  render() {
    return (
      <div>
        Welcome to Spooterfy
        <Link
            to={ROUTES.MUSIC}
        >
          <Button>
            Get Started
          </Button>
        </Link>
      </div>
    );
  }
}

export default Landing;