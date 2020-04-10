import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import { FormDialog } from 'src/components';
import { SIGN_UP } from 'src/utils/graphqlMutations';
import { localizeError } from 'src/helpers';

const addNewUserForm = [
  { label: 'Email', name: 'email', type: 'email', isRequired: true },
  { label: 'Mật khẩu', name: 'password', type: 'password', isRequired: true },
  {
    label: 'Xác nhận mật khẩu',
    name: 'confirmPassword',
    type: 'password',
    isRequired: true
  },
  {
    label: 'Mã số nhân viên',
    name: 'employeeId',
    type: 'text',
    isRequired: true
  },
  { label: 'Tên', name: 'firstName', type: 'text', isRequired: true },
  { label: 'Họ và Tên lót', name: 'lastName', type: 'text', isRequired: true },
  { label: 'Số điện thoại', name: 'phone', type: 'number', isRequired: true }
];

/*eslint-disable react/no-multi-comp */
const UsersDialog = props => {
  const { open, dialogType, onCloseDialog } = props;
  const [signUp, { loading, error }] = useMutation(SIGN_UP);

  const handleCreateNewUser = async userInfo => {
    console.log(userInfo);
    // await signUp({ variables: userInfo });
  };

  const switchDialog = dialogType => {
    switch (dialogType) {
      case 'addNewUserForm':
        return (
          <FormDialog
            open={open}
            handleContinue={handleCreateNewUser}
            handleCancel={onCloseDialog}
            title={'Thêm người dùng'}
            formData={addNewUserForm}
            error={localizeError(error)}
            isLoading={loading}
          />
        );
      default:
        return null;
    }
  };

  return switchDialog(dialogType);
};

UsersDialog.propTypes = {
  open: PropTypes.bool,
  dialogType: PropTypes.string,
  onCloseDialog: PropTypes.func
};

export default UsersDialog;
