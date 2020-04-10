import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import validate from 'src/utils/validateOverride';
import { meActions } from 'src/redux/actions';
import { useMutation } from 'react-apollo';
import useStyles from './signInStyles';

import {
  Button,
  TextField,
  Link,
  Typography,
  CircularProgress
} from '@material-ui/core';

import { SIGN_IN } from 'src/utils/graphqlMutations';
import * as routes from 'src/common/routes';
import meQuery from 'src/utils/meQuery';

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
      maximum: 128,
      minimum: 3
    }
  }
};

const SignIn = props => {
  const { history, updateMe } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [signIn, { data, loading }] = useMutation(SIGN_IN);

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

  const handleSignIn = async event => {
    event.preventDefault();
    await signIn({ variables: { ...formState.values } });
  };

  if (data && data.signIn) {
    meQuery(data.signIn.accessToken).then(me => {
      me.accessToken = data.signIn.accessToken;
      updateMe(me);
      history.push(routes.DASHBOARD);
    });
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.content}>
      <div className={classes.contentBody}>
        <form className={classes.form} onSubmit={handleSignIn}>
          <Typography className={classes.title} variant="h2">
            Sign in
          </Typography>
          <TextField
            className={classes.textField}
            error={hasError('email')}
            fullWidth
            helperText={hasError('email') ? formState.errors.email[0] : null}
            label="Email"
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

          <div className={classes.wrapper}>
            <Button
              className={classes.signInButton}
              color="primary"
              disabled={!formState.isValid}
              fullWidth
              size="large"
              type="submit"
              variant="contained">
              Sign in
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
          <div className={classes.sameLine}>
            <Typography color="textSecondary" variant="body1">
              <Link
                component={RouterLink}
                to={routes.FORGOT_PASSWORD}
                variant="h5">
                Forgot Password?
              </Link>
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {"Don't have an account? "}
              <Link component={RouterLink} to={routes.SIGN_UP} variant="h5">
                Sign up
              </Link>
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  updateMe: me => {
    dispatch(meActions.updateMe(me));
  }
});

export default withRouter(connect(null, mapDispatchToProps)(SignIn));
