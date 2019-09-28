import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Notifications, Password, Account } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Settings = props => {
  const classes = useStyles();
  const { history } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item md={7} xs={12}>
          <Notifications />
        </Grid>
        <Grid item md={5} xs={12}>
          <Password />
        </Grid>
        <Grid item md={5} xs={12}>
          <Account history={history} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
