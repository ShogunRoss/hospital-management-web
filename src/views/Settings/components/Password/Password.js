import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core';
import { DynamicForm } from 'src/components';

const useStyles = makeStyles(theme => ({
  root: {},
  actionButtons: {
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2)
  }
}));

const Password = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const formRef = useRef(null);

  const onChangePassword = event => {
    event.preventDefault();
    console.log(formRef.current);
  };

  const changePasswordForm = [
    {
      label: 'Mật khẩu cũ',
      name: 'oldPassword',
      type: 'password',
      isRequired: true
    },
    {
      label: 'Mật khẩu mới',
      name: 'password',
      type: 'password',
      isRequired: true
    },
    {
      label: 'Xác nhận mật khẩu mới',
      name: 'confirmPassword',
      type: 'password',
      isRequired: true
    }
  ];

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" onSubmit={onChangePassword}>
        <CardHeader subheader="Thay đổi mật khẩu" title="Mật khẩu" />
        <Divider />
        <CardContent>
          <DynamicForm formRef={formRef} formData={changePasswordForm} />
        </CardContent>
        <Divider />
        <CardActions className={classes.actionButtons}>
          <Button color="primary" variant="contained">
            Thay đổi
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
