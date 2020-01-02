import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { useMutation } from 'react-apollo';

import {
  Button,
  IconButton,
  TextField,
  Typography,
  CircularProgress
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { FORGOT_PASSWORD } from 'utils/graphqlMutations';
import useStyles from './forgotPasswordStyles';
import * as routes from 'common/routes';
import AlertDialog from 'components/AlertDialog';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  }
};

const ForgotPassword = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [alertState, setAlertState] = useState({});

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const [sendForgotPasswordEmail, { loading }] = useMutation(FORGOT_PASSWORD);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleBack = () => {
    history.push(routes.SIGN_IN);
  };

  const handleResetPassword = async event => {
    event.preventDefault();
    setFormState(formState => ({
      ...formState,
      isValid: false
    }));

    try {
      await sendForgotPasswordEmail({ variables: formState.values });

      handleOnCompleted();
    } catch (err) {
      console.log({ err });
      handleOnError();
    }
  };

  const handleOnCompleted = () => {
    setAlertState({
      open: true,
      title: 'Success',
      content: 'Reset password email have been sent sucessfully.',
      handleContinue: () => {
        history.push(routes.HOME);
      }
    });
  };

  const handleOnError = () => {
    setAlertState({
      open: true,
      title: 'Error',
      content:
        'Reset password email have not been sent. Because your email address is not registerd.',
      handleContinue: () => {
        history.push(routes.SIGN_UP);
      },
      handleCancel: () => {
        setAlertState({ open: false });
        setFormState(formState => ({
          ...formState,
          isValid: true
        }));
      },
      continueText: 'Sign Up'
    });
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.content}>
      <div className={classes.contentHeader}>
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      <div className={classes.contentBody}>
        <form
          className={classes.form}
          onSubmit={event =>
            handleResetPassword(event, sendForgotPasswordEmail)
          }>
          <Typography className={classes.title} variant="h2">
            Forgot Password
          </Typography>
          <TextField
            className={classes.textField}
            error={hasError('email')}
            fullWidth
            helperText={hasError('email') ? formState.errors.email[0] : null}
            label="Email Address *"
            name="email"
            onChange={handleChange}
            type="text"
            value={formState.values.email || ''}
            variant="outlined"
          />

          <div className={classes.wrapper}>
            <Button
              className={classes.resetPasswordButton}
              color="primary"
              disabled={!formState.isValid}
              fullWidth
              size="large"
              type="submit"
              variant="contained">
              Reset Password
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </form>
      </div>
      {alertState.open && <AlertDialog {...alertState} />}
    </div>
  );
};

ForgotPassword.propTypes = {
  history: PropTypes.object
};

export default withRouter(ForgotPassword);
