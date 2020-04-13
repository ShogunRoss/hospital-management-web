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
  deleteDeviceButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.light
    }
  }
}));

const EditDevice = props => {
  const { className, profile, ...rest } = props;
  const classes = useStyles();
  const formRef = useRef(null);

  const editDeviceForm = [
    {
      label: 'Tên thiết bị',
      name: 'title',
      type: 'text',
      defaultValue: profile.title
    },
    {
      label: 'Ký hiệu thiết bị',
      name: 'model',
      type: 'text',
      defaultValue: profile.model
    },
    {
      label: 'Công ty sản xuất',
      name: 'manufacturer',
      type: 'text',
      defaultValue: profile.manufacturer
    },
    {
      label: 'Nước sản xuất',
      name: 'origin',
      type: 'text',
      defaultValue: profile.origin
    },
    {
      label: 'Năm sản xuất',
      name: 'manufacturedYear',
      type: 'year',
      defaultValue: new Date(profile.manufacturedYear, 0)
    },
    {
      label: 'Thời điểm đưa vào sử dụng',
      name: 'startUseTime',
      type: 'date',
      defaultValue:
        profile.startUseTime === '(Không rõ)'
          ? null
          : new Date(profile.startUseTime)
    },
    {
      label: 'Tình trạng đưa vào sử dụng',
      name: 'startUseState',
      type: 'select',
      defaultValue: profile.startUseState === 'Mới'
    },
    {
      label: 'Giá thành',
      name: 'originalPrice',
      type: 'number',
      defaultValue: profile.originalPrice
    },
    {
      label: 'Bộ phận',
      name: 'faculty',
      type: 'text',
      defaultValue: profile.faculty
    }
  ];

  const onEditDeviceProfile = event => {
    event.preventDefault();
    editDeviceForm.forEach(field => {
      if (field.type === 'year' || field.type === 'date') {
        formRef.current[field.name] = !formRef.current[field.name]
          ? null
          : field.type === 'year'
          ? new Date(formRef.current[field.name]).getFullYear()
          : new Date(formRef.current[field.name]);
      }
    });
    console.log(formRef.current);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" onSubmit={onEditDeviceProfile}>
        <CardHeader
          subheader="Điều chỉnh thông của thiết bị"
          title="Thay đổi thông tin">
          something
        </CardHeader>
        <Divider />
        <CardContent>
          <DynamicForm formRef={formRef} formData={editDeviceForm} />
        </CardContent>
        <Divider />
        <CardActions className={classes.actionButtons}>
          <Button color="primary" variant="contained" type="submit">
            Lưu thay đổi
          </Button>
          <Button variant="contained" className={classes.deleteDeviceButton}>
            Xóa thiết bị
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

EditDevice.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object
};

export default EditDevice;
