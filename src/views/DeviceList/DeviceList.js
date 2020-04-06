import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, IconButton } from '@material-ui/core';

import { DEVICES } from 'src/utils/graphqlQueries';
import { useQuery } from 'react-apollo';
import { MaterialTable } from 'src/components';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { DevicesToolbar } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

/* eslint-disable react/no-multi-comp, react/display-name */
const DeviceList = () => {
  const classes = useStyles();

  const { data, loading } = useQuery(DEVICES);
  // console.log(data);
  let devices = [];
  if (!loading) {
    devices = data.devices.data.map(device => ({
      ...device,
      startUseState: device.startUseState ? 'Mới' : 'Cũ',
      startUseTime: device.startUseTime
        ? new Date(device.startUseTime).toLocaleDateString()
        : '(Không rõ)'
    }));
  }

  const options = {
    viewColumns: true
  };

  const columns = [
    {
      name: 'title',
      label: 'Tên thiết bị',
      options: { filter: false, viewColumns: false }
    },
    {
      name: 'model',
      label: 'Ký hiệu thiết bị',
      options: { filter: false }
    },
    {
      name: 'manufacturer',
      label: 'Công ty sản xuất',
      options: { filter: true }
    },
    {
      name: 'origin',
      label: 'Nước sản xuất',
      options: { filter: true }
    },
    {
      name: 'manufacturedYear',
      label: 'Năm sản xuất',
      options: { filter: true }
    },
    {
      name: 'startUseTime',
      label: 'Thời điểm đưa vào sử dụng',
      options: { filter: true }
    },
    {
      name: 'startUseState',
      label: 'Tình trạng đưa vào sử dụng',
      options: { filter: true }
    },
    {
      name: 'originalPrice',
      label: 'Giá thành',
      options: { filter: false }
    },
    {
      name: 'faculty',
      label: 'Bộ phận',
      options: { filter: true }
    },
    {
      name: 'action',
      label: 'Thao tác',
      options: {
        sort: false,
        filter: false,
        viewColumns: false,
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
      <DevicesToolbar />
      <MaterialTable
        title={<Typography variant="h4">Danh sách thiết bị</Typography>}
        data={devices}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default DeviceList;
