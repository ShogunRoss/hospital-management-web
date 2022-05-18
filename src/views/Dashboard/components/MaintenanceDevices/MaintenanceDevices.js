import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import BuildIcon from '@material-ui/icons/BuildOutlined';
import InfoCard from '../InfoCard/InfoCard';

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
    backgroundColor: theme.palette.orange,
    height: 64,
    width: 64,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const Devices = props => {
  const { className, deviceNumber, ...rest } = props;

  const classes = useStyles();

  return (
    <InfoCard
      title="SỐ THIẾT BỊ ĐANG BẢO TRÌ"
      number={deviceNumber}
      icon={<BuildIcon className={classes.icon} />}
    />
  );
};

Devices.propTypes = {
  className: PropTypes.string,
  deviceNumber: PropTypes.number
};

export default Devices;
