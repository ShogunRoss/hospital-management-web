import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Grid } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import useStyles from './deviceProfileStyles';
import EditDevice from '../EditDevice';
import { LatestEventsList } from 'src/components';
import { ACTIVE_EVENTS_BY_DEVICE } from 'src/utils/graphqlQueries';
import { useQuery } from 'react-apollo';

const DeviceProfile = props => {
  const { onGoBack, profile } = props;
  const classes = useStyles();

  const { data: activeEvents, loading: activeEventsLoading } = useQuery(
    ACTIVE_EVENTS_BY_DEVICE,
    {
      variables: { deviceId: profile.id }
    }
  );
  const loading = activeEventsLoading;
  let activeEventsData = [];
  if (!loading) {
    if (activeEvents && activeEvents.activeEventsByDevice) {
      activeEventsData = activeEvents.activeEventsByDevice.data;
    }
  }

  return (
    <div>
      <IconButton onClick={onGoBack} className={classes.backIcon}>
        <ArrowBackIcon />
      </IconButton>
      <Grid container spacing={4}>
        <Grid item md={5} xs={12}>
          <EditDevice profile={profile} />
        </Grid>
        <Grid item md={7} xs={12}>
          <LatestEventsList hidden="device" activeEvents={activeEventsData} />
        </Grid>
      </Grid>
    </div>
  );
};

DeviceProfile.propTypes = {
  profile: PropTypes.object,
  onGoBack: PropTypes.func
};

export default DeviceProfile;
