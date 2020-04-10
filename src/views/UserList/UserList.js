import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useQuery } from 'react-apollo';
// import { UsersToolbar, UsersTable } from './components';
// import mockData from './data';
import { USERS } from 'src/utils/graphqlQueries';
// import { useSelector } from 'react-redux';
import { IconButton, Typography, Avatar } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { MaterialTable, FormDialog } from 'src/components';
import { UsersToolbar, UsersDialog, UserProfile } from './components';
import { getInitials } from 'src/helpers';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  action: {
    textAlign: 'center'
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.primary.dark
  }
}));

/* eslint-disable react/no-multi-comp, react/display-name */
const UserList = () => {
  const classes = useStyles();
  const [dialogType, setDialogType] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data, loading } = useQuery(USERS);
  let users = [];
  if (!loading) {
    users = data.users.data.map(user => ({
      ...user,
      name: `${user.lastName} ${user.firstName}`,
      createdAt: new Date(user.createdAt).toLocaleDateString()
    }));
  }

  const options = {
    onRowClick: (_, rowMeta) => setSelectedUser(users[rowMeta.rowIndex])
  };

  const columns = [
    {
      name: 'name',
      label: 'Họ và Tên',
      options: {
        filter: false,
        setCellProps: () => ({ style: { paddingTop: 0, paddingBottom: 0 } }),
        customBodyRender: (value, { rowIndex }) => (
          <div className={classes.nameContainer}>
            <Avatar className={classes.avatar} src={users[rowIndex].avatar}>
              {getInitials(value)}
            </Avatar>
            <Typography variant="body1">{value}</Typography>
          </div>
        )
      }
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
    }
    // {
    //   name: 'action',
    //   label: 'Thao tác',
    //   options: {
    //     sort: false,
    //     filter: false,
    //     setCellHeaderProps: () => ({ style: { textAlign: 'center' } }),
    //     setCellProps: () => ({ style: { padding: 0 } }),
    //     customBodyRender: () => (
    //       <div className={classes.action}>
    //         <IconButton>
    //           <EditIcon color="primary" />
    //         </IconButton>
    //         <IconButton>
    //           <DeleteIcon color="error" />
    //         </IconButton>
    //       </div>
    //     )
    //   }
    // }
  ];

  const handleAddNewUser = () => {
    setDialogType('addNewUserForm');
    setOpenDialog(true);
  };

  return (
    <div className={classes.root}>
      {!selectedUser ? (
        <Fragment>
          <UsersDialog
            open={openDialog}
            dialogType={dialogType}
            onCloseDialog={() => setOpenDialog(false)}
          />
          <UsersToolbar onAddNewUser={handleAddNewUser} />
          <MaterialTable
            title={<Typography variant="h4">Danh sách người dùng</Typography>}
            data={users}
            columns={columns}
            options={options}
          />
        </Fragment>
      ) : (
        <UserProfile
          profile={selectedUser}
          onGoBack={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default UserList;
