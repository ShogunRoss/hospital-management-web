import React from 'react';
import PropTypes from 'prop-types';
import { FormDialog } from 'src/components';
import { localizeError } from 'src/helpers';

const addNewDeviceForm = [
  { label: 'Tên thiết bị', name: 'title', type: 'text', isRequired: true },
  { label: 'Ký hiệu thiết bị', name: 'model', type: 'text', isRequired: true },
  {
    label: 'Công ty sản xuất',
    name: 'manufacturer',
    type: 'text',
    isRequired: true
  },
  {
    label: 'Nước sản xuất',
    name: 'origin',
    type: 'text',
    isRequired: true
  },
  {
    label: 'Năm sản xuất',
    name: 'manufacturedYear',
    type: 'year',
    isRequired: false
  },
  {
    label: 'Thời điểm đưa vào sử dụng',
    name: 'startUseTime',
    type: 'date',
    isRequired: false
  },
  {
    label: 'Tình trạng đưa vào sử dụng',
    name: 'startUseState',
    type: 'select',
    isRequired: false
  },
  {
    label: 'Giá thành',
    name: 'originalPrice',
    type: 'number',
    isRequired: true
  },
  {
    label: 'Bộ phận',
    name: 'faculty',
    type: 'text',
    isRequired: true
  }
];

const DevicesDialog = props => {
  const { open, dialogType, onCloseDialog } = props;

  const handleCreateNewDevice = async deviceInfo => {
    console.log(deviceInfo);
  };

  const switchDialog = dialogType => {
    switch (dialogType) {
      case 'addNewUserForm':
        return (
          <FormDialog
            open={open}
            handleContinue={handleCreateNewDevice}
            handleCancel={onCloseDialog}
            title={'Thêm thiết bị'}
            formData={addNewDeviceForm}
            // error={localizeError(error)}
            // isLoading={loading}
          />
        );
      default:
        return null;
    }
  };

  return switchDialog(dialogType);
};

DevicesDialog.propTypes = {
  open: PropTypes.bool,
  dialogType: PropTypes.string,
  onCloseDialog: PropTypes.func
};

export default DevicesDialog;
