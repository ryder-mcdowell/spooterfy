import React, { Component } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import * as ROUTES from '../../constants/routes';

class Navigation extends Component {
  render() {
    return (
      <AppBar
        position="sticky"
      >
        <MenuItem>
          {this.props.authenticated
            ? <Link
                to={ROUTES.GENRES}
              >
                <Typography variant="button">
                  Music
                </Typography>
              </Link>
            : <Link
                to={ROUTES.LANDING}
              >
                <Typography variant="button">
                  Landing
                </Typography>
              </Link>
          }
        </MenuItem>
      </AppBar>
    );
  }
}

export default Navigation;
