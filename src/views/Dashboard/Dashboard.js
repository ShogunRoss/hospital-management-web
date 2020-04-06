import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { useQuery } from 'react-apollo';
import { connect } from 'react-redux';

import { USERS, DEVICES, ACTIVE_EVENTS } from 'src/utils/graphqlQueries';
import {
  Users,
  Devices,
  ActiveEvents,
  MaintenanceDevices,
  ReportEvents,
  LiquidatedDevices,
  UsageChart,
  LatestEventsList
} from './components';
import {
  usersActions,
  devicesActions,
  activeEventsActions
} from 'src/redux/actions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const { data: usersData, loading: usersLoading } = useQuery(USERS);
  const { data: devicesData, loading: devicesLoading } = useQuery(DEVICES);
  const { data: activeEventsData, loading: activeEventsLoading } = useQuery(
    ACTIVE_EVENTS
  );
  const loading = usersLoading || devicesLoading || activeEventsLoading;

  if (loading) {
    return null;
  }

  const reportEventsNumber = activeEventsData.activeEvents.data.filter(
    event => event.reported
  ).length;

  const maintainedDevicesNumber = devicesData.devices.data.filter(
    device => device.avaibility === 'maintaining'
  ).length;

  const liquidatedDevicesNumber = devicesData.devices.data.filter(
    device => device.avaibility === 'liquidated'
  ).length;

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item lg={7} md={7} sm={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item lg={4} md={4} xs={12}>
              <Users userNumber={usersData.users.totalCount} />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <ActiveEvents
                eventNumber={activeEventsData.activeEvents.totalCount}
              />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <ReportEvents eventNumber={reportEventsNumber} />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item lg={4} md={4} xs={12}>
              <Devices
                deviceNumber={
                  devicesData.devices.totalCount -
                  maintainedDevicesNumber -
                  liquidatedDevicesNumber
                }
              />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <MaintenanceDevices deviceNumber={maintainedDevicesNumber} />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <LiquidatedDevices deviceNumber={liquidatedDevicesNumber} />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <UsageChart />
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={5} md={5} sm={12} xs={12}>
          <LatestEventsList activeEvents={activeEventsData.activeEvents.data} />
        </Grid>
      </Grid>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  updateUsers: users => {
    dispatch(usersActions.updateUsers(users));
  },
  updateDevices: devices => {
    dispatch(devicesActions.updateDevices(devices));
  },
  updateActiveEvents: events => {
    dispatch(activeEventsActions.updateActiveEvents(events));
  }
});

export default connect(null, mapDispatchToProps)(Dashboard);
