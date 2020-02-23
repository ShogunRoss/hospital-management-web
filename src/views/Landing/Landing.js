import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import useStyles from './landingStyles';
import * as routes from 'src/common/routes';

const Landing = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Typography color="inherit" align="center" variant="h1">
          HOSPITAL FACILITIES MANAGEMENT SYSTEM
        </Typography>
        <Typography color="inherit" align="center" variant="h5">
          Enjoy our platform to help you manage your hospital facilities
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          className={classes.button}
          component={RouterLink}
          to={routes.ADMIN}>
          Dashboard
        </Button>
        <Typography variant="body2" color="inherit" className={classes.more}>
          Manage your hospital facilities
        </Typography>
        {/* <div className={classes.backdrop} /> */}
        {/* <div className={classes.background} /> */}
      </Container>
    </div>
  );
};

export default Landing;
