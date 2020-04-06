import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

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
    backgroundColor: theme.palette.red,
    height: 64,
    width: 64,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const LiquidatedDevices = props => {
  const { className, deviceNumber, ...rest } = props;

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
              SỐ THIẾT BỊ ĐÃ THANH LÝ
            </Typography>
            <Typography variant="h1">{deviceNumber}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

LiquidatedDevices.propTypes = {
  className: PropTypes.string,
  eventNumber: PropTypes.number
};

export default LiquidatedDevices;
