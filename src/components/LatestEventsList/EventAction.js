import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  dotIcon: {
    height: 8,
    width: 8,
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: theme.spacing(2)
  },
  turnOn: { backgroundColor: theme.palette.success.main },
  turnOff: { backgroundColor: theme.palette.purple },
  report: { backgroundColor: theme.palette.yellow },
  maintained: { backgroundColor: theme.palette.orange },
  liquiadted: { backgroundColor: theme.palette.red }
}));

const EventAction = props => {
  const classes = useStyles();

  const { action } = props;

  let message = '';
  switch (action) {
    case 'turnOn':
      message = 'Bật Thiết bị';
      break;
    case 'turnOff':
      message = 'Tắt Thiết bị';
      break;
    case 'report':
      message = 'Báo cáo';
      break;
    case 'maintained':
      message = 'Bảo trì thiết bị';
      break;
    case 'liquidated':
      message = 'Thanh lý thiết bị';
      break;
  }

  return (
    <div className={classes.root}>
      <span className={clsx(classes.dotIcon, classes[action])} />
      <Typography>{message}</Typography>
    </div>
  );
};

EventAction.propTypes = {
  action: PropTypes.oneOf([
    'turnOn',
    'turnOff',
    'report',
    'maintained',
    'liquiadted'
  ])
};

export default EventAction;
