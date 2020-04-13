import React from 'react';
import PropTypes from 'prop-types';
import { FormDialog, AlertDialog } from 'src/components';
import _ from 'lodash';
import Image from 'material-ui-image';
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
const areEqual = (prevProps, nextProps) => _.isEqual(prevProps, nextProps);

/* eslint-disable react/no-multi-comp */
const DevicesDialog = React.memo(props => {
  const { dialogState, onCloseDialog } = props;
  const { open, type, value } = dialogState;
  const handleCreateNewDevice = async deviceInfo => {
    console.log(deviceInfo);
  };

  const onDownloadQrCode = () => {
    fetch(value).then(response => {
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = `${value.split('/').pop()}`;
        a.click();
      });
    });
  };

  const switchDialog = dialogType => {
    switch (dialogType) {
      case 'addNewDeviceForm':
        return (
          <FormDialog
            open={open}
            handleContinue={handleCreateNewDevice}
            handleCancel={onCloseDialog}
            title={'Thêm thiết bị'}
            continueText={'Thực hiện'}
            cancelText={'Bỏ qua'}
            formData={addNewDeviceForm}
            disableBackdropClick
            // error={localizeError(error)}
            // isLoading={loading}
          />
        );
      case 'viewQrCode':
        return (
          <AlertDialog
            open={open}
            handleCancel={onCloseDialog}
            handleContinue={onDownloadQrCode}
            title={'Mã QR'}
            continueText={'Tải xuống'}
            cancelText={'Quay lại'}
            content={<Image src={value} />}
          />
        );
      default:
        return null;
    }
  };

  return switchDialog(type);
}, areEqual);

DevicesDialog.propTypes = {
  dialogState: PropTypes.object,
  onCloseDialog: PropTypes.func
};

export default DevicesDialog;
