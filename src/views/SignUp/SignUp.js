import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  IconButton,
  Link,
  FormHelperText,
  Checkbox,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import useStyles from './signUpStyles';
import * as routes from 'src/common/routes';
import { useMutation } from 'react-apollo';
import { SIGN_UP } from 'src/utils/graphqlMutations';
import { DynamicForm } from 'src/components';

const SignUp = props => {
  const { history } = props;

  const classes = useStyles();
  const [formIsValid, setFormIsValid] = useState(false);
  const [checkBoxState, setCheckBoxState] = useState({
    checked: false,
    touched: false
  });
  const formRef = useRef(null);

  const [signUp] = useMutation(SIGN_UP);

  const signUpForm = [
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      isRequired: true
    },
    {
      label: 'Mật khẩu',
      name: 'password',
      type: 'password',
      isRequired: true
    },
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
    {
      label: 'Họ và Tên lót',
      name: 'lastName',
      type: 'text',
      isRequired: true
    },
    {
      label: 'Tên',
      name: 'firstName',
      type: 'text',
      isRequired: true
    },
    {
      label: 'Số điện thoại',
      name: 'phone',
      type: 'number'
    }
  ];

  const handleBack = () => {
    history.push(routes.SIGN_IN);
  };

  const handleSignUp = async event => {
    event.preventDefault();
    // const { email, password } = formState.values;
    // await signUp({ variables: { email, password } });
    history.push(routes.HOME);
  };

  return (
    <div className={classes.content}>
      <div className={classes.contentHeader}>
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      <div className={classes.contentBody}>
        <form className={classes.form} onSubmit={handleSignUp}>
          <Typography className={classes.title} variant="h2">
            Tạo tài khoản mới
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Sử dụng địa chỉ email của bạn để tạo tài khoản mới
          </Typography>
          <DynamicForm
            autoFocus
            formRef={formRef}
            formData={signUpForm}
            onFormIsValid={setFormIsValid}
          />
          <div className={classes.policy}>
            <Checkbox
              checked={checkBoxState.checked || false}
              className={classes.policyCheckbox}
              color="primary"
              name="policy"
              onChange={() =>
                setCheckBoxState({
                  touched: true,
                  checked: !checkBoxState.checked
                })
              }
            />
            <Typography
              className={classes.policyText}
              color="textSecondary"
              variant="body1">
              Tôi đã đọc{' '}
              <Link
                color="primary"
                component={RouterLink}
                to={routes.POLICY}
                underline="always"
                variant="h5">
                Điều khoản dịch vụ
              </Link>
            </Typography>
          </div>
          {checkBoxState.touched && !checkBoxState.checked && (
            <FormHelperText error>
              Phải xác nhận điều khoản dịch vụ
            </FormHelperText>
          )}
          <Button
            className={classes.signUpButton}
            color="primary"
            disabled={!formIsValid || !checkBoxState.checked}
            fullWidth
            size="large"
            type="submit"
            variant="contained">
            Đăng ký
          </Button>
          <Typography color="textSecondary" variant="body1">
            Đã có tài khoản?{' '}
            <Link component={RouterLink} to="/sign-in" variant="h5">
              Đăng nhập
            </Link>
          </Typography>
        </form>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignUp);
