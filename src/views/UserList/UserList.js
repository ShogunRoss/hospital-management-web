import React, { useState } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { useQuery } from 'react-apollo';
// import { UsersToolbar, UsersTable } from './components';
// import mockData from './data';
import { USERS } from 'src/utils/graphqlQueries';
// import { useSelector } from 'react-redux';
import { IconButton, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { MaterialTable } from 'src/components';
import { UsersToolbar } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  action: {
    textAlign: 'center'
  }
}));

/* eslint-disable react/no-multi-comp, react/display-name */
const UserList = () => {
  const classes = useStyles();

  const { data, loading } = useQuery(USERS);
  let users = [];
  if (!loading) {
    users = data.users.data.map(user => ({
      ...user,
      name: `${user.lastName} ${user.firstName}`,
      createdAt: new Date(user.createdAt).toLocaleDateString()
    }));
  }

  const columns = [
    {
      name: 'name',
      label: 'Họ và Tên',
      options: { filter: false }
    },
    {
      name: 'employeeId',
      label: 'Mã số nhân viên',
      options: { filter: false }
    },
    {
      name: 'role',
      label: 'Vai trò',
      options: { filter: true }
    },
    {
      name: 'phone',
      label: 'Số điện thoại',
      options: { filter: false }
    },
    {
      name: 'email',
      label: 'Email',
      options: { filter: false }
    },
    {
      name: 'createdAt',
      label: 'Ngày tạo tài khoản',
      options: { filter: false }
    },
    {
      name: 'action',
      label: 'Thao tác',
      options: {
        sort: false,
        filter: false,
        setCellHeaderProps: () => ({ style: { textAlign: 'center' } }),
        setCellProps: () => ({ style: { padding: 0 } }),
        customBodyRender: () => (
          <div className={classes.action}>
            <IconButton>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton>
              <DeleteIcon color="error" />
            </IconButton>
          </div>
        )
      }
    }
  ];

  return (
    <div className={classes.root}>
      <UsersToolbar />
      <MaterialTable
        title={<Typography variant="title">Danh sách người dùng</Typography>}
        data={users}
        columns={columns}
      />
    </div>
  );
};

export default UserList;
