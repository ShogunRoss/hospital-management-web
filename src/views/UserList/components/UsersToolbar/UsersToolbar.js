import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(2)
  }
}));

const UsersToolbar = props => {
  const { className, onAddNewUser, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Button
        onClick={onAddNewUser}
        color="primary"
        variant="contained"
        startIcon={<AddIcon />}>
        Thêm người dùng
      </Button>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string,
  onAddNewUser: PropTypes.func
};

export default UsersToolbar;
