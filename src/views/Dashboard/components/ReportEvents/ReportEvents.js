import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ReportProblemIcon from '@material-ui/icons/ReportProblemOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.yellow,
    height: 64,
    width: 64,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const ReportEvents = props => {
  const { className, eventNumber, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2">
              LƯỢT BÁO CÁO SAI TRẠNG THÁI
            </Typography>
            <Typography variant="h1">{eventNumber}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <ReportProblemIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

ReportEvents.propTypes = {
  className: PropTypes.string,
  eventNumber: PropTypes.number
};

export default ReportEvents;
