import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  CardActions,
  Button
} from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { DynamicForm } from 'src/components';

const useStyles = makeStyles(theme => ({
  root: {},
  actionButtons: {
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2)
  },
  deleteUserButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.light
    }
  }
}));

const EditInfo = props => {
  const { className, profile, ...rest } = props;
  const classes = useStyles();
  const formRef = useRef(null);
  const editUserForm = [
    {
      label: 'Mã số nhân viên',
      name: 'employeeId',
      type: 'text',
      defaultValue: profile.employeeId
    },
    {
      label: 'Tên',
      name: 'firstName',
      type: 'text',
      defaultValue: profile.firstName
    },
    {
      label: 'Họ và Tên lót',
      name: 'lastName',
      type: 'text',
      defaultValue: profile.lastName
    },
    {
      label: 'Số điện thoại',
      name: 'phone',
      type: 'number',
      defaultValue: profile.phone
    }
  ];

  const onEditUserProfile = event => {
    event.preventDefault();
    console.log(formRef.current);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" onSubmit={onEditUserProfile}>
        <CardHeader
          subheader="Điều chỉnh thông của người dùng"
          title="Thay đổi thông tin">
          something
        </CardHeader>
        <Divider />
        <CardContent>
          <DynamicForm formRef={formRef} formData={editUserForm} />
        </CardContent>
        <Divider />
        <CardActions className={classes.actionButtons}>
          <Button color="primary" variant="contained" type="submit">
            Lưu thay đổi
          </Button>
          <Button variant="contained" className={classes.deleteUserButton}>
            Xóa tài khoản
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

EditInfo.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object
};

export default EditInfo;
