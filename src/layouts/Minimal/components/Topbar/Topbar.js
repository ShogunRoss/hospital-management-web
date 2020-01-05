import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import theme from 'theme';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  },
  boxLogo: {
    display: 'flex',
    alignItems: 'center'
  },
  brandName: {
    color: theme.palette.white,
    marginLeft: theme.spacing(2),
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  logo: {
    width: 40
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed">
      <Toolbar>
        <RouterLink className={classes.boxLogo} to="/">
          <img
            className={classes.logo}
            alt="Logo"
            src="/images/logos/logo.svg"
          />
          <Typography className={classes.brandName} variant="h5">
            Hệ thống quản lý thiết bị
          </Typography>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
