import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { connect } from 'react-redux';

import * as routes from 'src/common/routes';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 100,
    height: 100,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const {
    className,
    lastName,
    firstName,
    avatar,
    role,
    accessToken,
    dispatch,
    ...rest
  } = props;
  const classes = useStyles();

  const user = {
    name: `${lastName} ${firstName}`,
    avatar: avatar.uri,
    bio: role
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to={routes.SETTINGS}
      />
      <Typography className={classes.name} variant="h4">
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => state.me;

export default connect(mapStateToProps)(Profile);
