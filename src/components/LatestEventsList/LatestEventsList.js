import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import { MaterialTable } from 'src/components';
import EventAction from './EventAction';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    padding: 0
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.purple,
    height: 64,
    width: 64,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const LatestEventsList = props => {
  const { className, activeEvents, hidden, ...rest } = props;
  const classes = useStyles();

  const options = {
    pagination: false,
    responsive: 'scroll'
  };

  const columns = [
    {
      label: 'Thời điểm',
      name: 'createdAt',
      options: {
        filter: false
      }
    },
    {
      label: 'Thiết bị',
      name: 'device',
      options: {
        display: hidden !== 'device',
        setCellProps: () => ({ style: { fontWeight: 500 } })
      }
    },
    {
      label: 'Người dùng',
      name: 'creator',
      options: {
        display: hidden !== 'creator'
      }
    },
    {
      label: 'Hành động',
      name: 'action',
      options: {
        setCellHeaderProps: () => ({
          style: {
            justifyContent: 'flex-end',
            display: 'flex'
          }
        })
      }
    }
  ];

  const data = activeEvents?.map(event => ({
    createdAt: hidden
      ? new Date(event.createdAt).toLocaleString()
      : new Date(event.createdAt).toLocaleTimeString(),
    device:
      hidden === 'device'
        ? ''
        : `${event.device.title} (${event.device.faculty})`,
    creator:
      hidden === 'creator'
        ? ''
        : event.creator.firstName
        ? `${event.creator.lastName} ${event.creator.firstName}`
        : event.creator.employeeId || '',
    action: event.reported ? (
      <EventAction action={'report'} />
    ) : event.actionType ? (
      <EventAction action={'turnOn'} />
    ) : (
      <EventAction action={'turnOff'} />
    )
  }));

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent classes={{ root: classes.root }}>
        <MaterialTable
          toolbarNarrow
          title={
            <Typography className={classes.title} variant="body2">
              SỰ KIỆN MỚI NHẤT
            </Typography>
          }
          columns={columns}
          data={data}
          options={options}
        />
      </CardContent>
    </Card>
  );
};

LatestEventsList.propTypes = {
  className: PropTypes.string,
  activeEvents: PropTypes.array,
  hidden: PropTypes.string
};

export default LatestEventsList;
