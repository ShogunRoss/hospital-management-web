import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import useStyles from './signUpStyles';
import * as routes from 'common/routes';
import { useMutation } from 'react-apollo';
import { SIGN_UP } from 'utils/graphqlMutations';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  confirmPassword: {
    equality: 'password',
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  policy: {
    presence: { allowEmpty: false, message: 'is required' },
    checked: true
  }
};

const SignUp = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [signUp] = useMutation(SIGN_UP);

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

  const handleBack = () => {
    history.push(routes.SIGN_IN);
  };

  const handleSignUp = async event => {
    event.preventDefault();
    const { email, password } = formState.values;
    await signUp({ variables: { email, password } });
    history.push(routes.HOME);
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
        <form className={classes.form} onSubmit={handleSignUp}>
          <Typography className={classes.title} variant="h2">
            Create new account
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Use your email to create new account
          </Typography>
          <TextField
            className={classes.textField}
            error={hasError('email')}
            fullWidth
            helperText={hasError('email') ? formState.errors.email[0] : null}
            label="Email address"
            name="email"
            onChange={handleChange}
            type="text"
            value={formState.values.email || ''}
            variant="outlined"
          />
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
          <div className={classes.policy}>
            <Checkbox
              checked={formState.values.policy || false}
              className={classes.policyCheckbox}
              color="primary"
              name="policy"
              onChange={handleChange}
            />
            <Typography
              className={classes.policyText}
              color="textSecondary"
              variant="body1">
              I have read the{' '}
              <Link
                color="primary"
                component={RouterLink}
                to="#"
                underline="always"
                variant="h6">
                Terms and Conditions
              </Link>
            </Typography>
          </div>
          {hasError('policy') && (
            <FormHelperText error>{formState.errors.policy[0]}</FormHelperText>
          )}
          <Button
            className={classes.signUpButton}
            color="primary"
            disabled={!formState.isValid}
            fullWidth
            size="large"
            type="submit"
            variant="contained">
            Sign up now
          </Button>
          <Typography color="textSecondary" variant="body1">
            Have an account?{' '}
            <Link component={RouterLink} to="/sign-in" variant="h6">
              Sign in
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
