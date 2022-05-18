import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import InfoCard from '../InfoCard/InfoCard';

const useStyles = makeStyles(theme => ({
  icon: {
    height: 32,
    width: 32
  }
}));

const LiquidatedDevices = props => {
  const { deviceNumber, ...rest } = props;

  const classes = useStyles();

  return (
    <InfoCard
      title="SỐ THIẾT BỊ ĐÃ THANH LÝ"
      number={deviceNumber}
      icon={<AttachMoneyIcon className={classes.icon} />}
    />
  );
};

LiquidatedDevices.propTypes = {
  className: PropTypes.string,
  eventNumber: PropTypes.number
};

export default LiquidatedDevices;
