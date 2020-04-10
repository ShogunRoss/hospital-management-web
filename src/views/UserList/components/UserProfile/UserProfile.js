import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Grid } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import useStyles from './userProfileStyles';
import UserBio from '../UserBio';
import InfoEdit from '../InfoEdit';
import { LatestEventsList } from 'src/components';
import { ACTIVE_EVENTS_BY_USER } from 'src/utils/graphqlQueries';
import { useQuery } from 'react-apollo';

const UserProfile = props => {
  const { onGoBack, profile } = props;
  const classes = useStyles();

  const { data: activeEvents, loading: activeEventsLoading } = useQuery(
    ACTIVE_EVENTS_BY_USER,
    {
      variables: { userId: profile.id }
    }
  );
  const loading = activeEventsLoading;
  let activeEventsData = [];
  if (!loading) {
    if (activeEvents && activeEvents.activeEventsByUser) {
      activeEventsData = activeEvents.activeEventsByUser.data;
    }
  }

  return (
    <div>
      <IconButton onClick={onGoBack} className={classes.backIcon}>
        <ArrowBackIcon />
      </IconButton>
      <Grid container spacing={4}>
        <Grid item container md={5} xs={12} spacing={4}>
          <Grid item xs={12}>
            <UserBio profile={profile} />
          </Grid>
          <Grid item xs={12}>
            <InfoEdit profile={profile} />
          </Grid>
        </Grid>
        <Grid item md={7} xs={12}>
          <LatestEventsList hidden="creator" activeEvents={activeEventsData} />
        </Grid>
      </Grid>
    </div>
  );
};

UserProfile.propTypes = {
  profile: PropTypes.object,
  onGoBack: PropTypes.func
};

export default UserProfile;
