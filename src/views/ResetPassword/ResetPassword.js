import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { Button, TextField, Typography } from '@material-ui/core';

import useStyles from './resetPasswordStyles';
import * as routes from 'common/routes';
import { useMutation } from 'react-apollo';
import { RESET_PASSWORD } from 'utils/graphqlMutations';

const schema = {
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6,
      maximum: 42
    }
  },
  confirmPassword: {
    equality: 'password',
    presence: { allowEmpty: false, message: 'is required' }
  }
};

const ResetPassword = props => {
  const classes = useStyles();

  const { passwordToken } = props.match.params;
  const { history } = props;
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [resetPassword] = useMutation(RESET_PASSWORD);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

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

  const handleConfirm = async event => {
    event.preventDefault();

    const { password } = formState.values;
    try {
      await resetPassword({
        variables: { newPassword: password, passwordToken }
      });
      history.push(routes.HOME);
    } catch (err) {
      console.log(err);
    }
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.content}>
      <div className={classes.contentBody}>
        <form className={classes.form} onSubmit={handleConfirm}>
          <Typography className={classes.title} variant="h2">
            Reset Password
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Reset your forgotten password
          </Typography>
          <TextField
            className={classes.textField}
            error={hasError('password')}
            fullWidth
            helperText={
              hasError('password') ? formState.errors.password[0] : null
            }
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={formState.values.password || ''}
            variant="outlined"
          />
          <TextField
            className={classes.textField}
            error={hasError('confirmPassword')}
            fullWidth
            helperText={
              hasError('confirmPassword')
                ? formState.errors.confirmPassword[0]
                : null
            }
            label="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            type="password"
            value={formState.values.confirmPassword || ''}
            variant="outlined"
          />
          <Button
            className={classes.confirmButton}
            color="primary"
            disabled={!formState.isValid}
            fullWidth
            size="large"
            type="submit"
            variant="contained">
            Confirm
          </Button>
        </form>
      </div>
    </div>
  );
};

ResetPassword.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
};

export default withRouter(ResetPassword);
