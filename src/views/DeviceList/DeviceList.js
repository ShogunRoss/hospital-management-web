import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, IconButton, SvgIcon } from '@material-ui/core';

import { DEVICES } from 'src/utils/graphqlQueries';
import { useQuery } from 'react-apollo';
import { MaterialTable } from 'src/components';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { DevicesToolbar, DevicesDialog, DeviceProfile } from './components';

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
  },
  action: {
    textAlign: 'center'
  }
}));

/* eslint-disable react/no-multi-comp, react/display-name */
const DeviceList = () => {
  const classes = useStyles();
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [dialogState, setDialogState] = useState({
    type: '',
    open: false,
    value: ''
  });

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
    viewColumns: true,
    onRowClick: (rowData, rowMeta) =>
      setSelectedDevice(devices[rowMeta.dataIndex])
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
    // {
    //   name: 'action',
    //   label: 'Thao tác',
    //   options: {
    //     sort: false,
    //     filter: false,
    //     viewColumns: false,
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
    {
      name: 'qrcode',
      label: 'QR Code',
      options: {
        sort: false,
        filter: false,
        setCellHeaderProps: () => ({ style: { textAlign: 'center' } }),
        setCellProps: () => ({ style: { padding: 0 } }),
        customBodyRender: value => (
          <div className={classes.action}>
            <IconButton onClick={event => handleQRViewClick(event, value)}>
              <SvgIcon color="primary">
                <path
                  fill="currentColor"
                  d="M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H11V13H9V11M15,11H17V13H19V11H21V13H19V15H21V19H19V21H17V19H13V21H11V17H15V15H17V13H15V11M19,19V15H17V19H19M15,3H21V9H15V3M17,5V7H19V5H17M3,3H9V9H3V3M5,5V7H7V5H5M3,15H9V21H3V15M5,17V19H7V17H5Z"
                />
              </SvgIcon>
            </IconButton>
          </div>
        )
      }
    }
  ];

  const handleQRViewClick = (event, value) => {
    event.stopPropagation();
    setDialogState({
      open: true,
      type: 'viewQrCode',
      value: value
    });
  };

  const handleAddNewDevice = () => {
    setDialogState(dialogState => ({
      ...dialogState,
      open: true,
      type: 'addNewDeviceForm'
    }));
  };

  const handleDialogClose = () =>
    setDialogState(dialogState => ({
      ...dialogState,
      open: false,
      value: ''
    }));

  return (
    <div className={classes.root}>
      {!selectedDevice ? (
        <Fragment>
          <DevicesDialog
            dialogState={dialogState}
            onCloseDialog={handleDialogClose}
          />
          <DevicesToolbar onAddNewDevice={handleAddNewDevice} />
          <MaterialTable
            title={<Typography variant="h4">Danh sách thiết bị</Typography>}
            data={devices}
            columns={columns}
            options={options}
          />
        </Fragment>
      ) : (
        <DeviceProfile
          profile={selectedDevice}
          onGoBack={() => setSelectedDevice(null)}
        />
      )}
    </div>
  );
};

export default DeviceList;
