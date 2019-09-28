import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';

import * as routes from 'common/routes';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    paddingTop: 150,
    textAlign: 'center'
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 320
  },
  buttonDirect: {
    color: theme.palette.neutral,
    marginTop: theme.spacing(4)
  }
}));

const ConfirmNotification = props => {
  const classes = useStyles();
  const { confirmToken } = props.match.params;
  console.log(confirmToken);

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <div className={classes.content}>
            <Typography variant="h1">
              Your email have been confirmed successfully!
            </Typography>
            <img
              alt="Under development"
              className={classes.image}
              src="/images/completed_task.svg"
            />
            <br />
            <Button
              className={classes.buttonDirect}
              variant="contained"
              color="primary"
              component={RouterLink}
              to={routes.SIGN_IN}>
              Direct to Sign In
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

ConfirmNotification.propTypes = {
  match: PropTypes.object
};

export default ConfirmNotification;
