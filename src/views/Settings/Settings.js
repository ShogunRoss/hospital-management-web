import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { useQuery } from 'react-apollo';
import { ME } from 'src/utils/graphqlQueries';

import { Notifications, Password, Account } from './components';
import UserBio from '../UserList/components/UserBio';
import EditInfo from '../UserList/components/EditInfo';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Settings = props => {
  const classes = useStyles();
  const { history } = props;
  const { data, loading } = useQuery(ME);
  let profile = {};

  if (!loading) {
    profile = {
      ...data.me,
      name: `${data.me.lastName} ${data.me.firstName}`,
      createdAt: new Date(data.me.createdAt).toLocaleDateString()
    };
  }

  if (loading) return null;

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        {/* <Grid item md={7} xs={12}>
          <Notifications />
        </Grid> */}
        <Grid container item md={6} xs={12} spacing={4}>
          <Grid item xs={12}>
            <UserBio profile={profile} />
          </Grid>
          <Grid item xs={12}>
            <Password />
          </Grid>
        </Grid>
        <Grid container item md={6} xs={12} spacing={4}>
          <Grid item xs={12}>
            <EditInfo profile={profile} />
          </Grid>
          <Grid item xs={12}>
            <Account history={history} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

Settings.propTypes = {
  history: PropTypes.object
};

export default Settings;
