import React, { useState, useEffect, useRef } from 'react';
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
import { DynamicForm } from 'src/components';

const SignIn = props => {
  const { history, updateMe } = props;

  const classes = useStyles();

  const [signIn, { data, loading }] = useMutation(SIGN_IN);

  const signInForm = [
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
    }
  ];
  const [formIsValid, setFormIsValid] = useState(false);
  const formRef = useRef(null);

  const handleSignIn = async event => {
    event.preventDefault();
    await signIn({ variables: { ...formRef.current } });
  };

  if (data && data.signIn) {
    meQuery(data.signIn.accessToken).then(me => {
      me.accessToken = data.signIn.accessToken;
      updateMe(me);
      history.push(routes.DASHBOARD);
    });
  }

  return (
    <div className={classes.content}>
      <div className={classes.contentBody}>
        <form className={classes.form} onSubmit={handleSignIn}>
          <Typography className={classes.title} variant="h2">
            Đăng nhập
          </Typography>
          <DynamicForm
            formData={signInForm}
            formRef={formRef}
            autoFocus
            onFormIsValid={setFormIsValid}
          />

          <div className={classes.wrapper}>
            <Button
              className={classes.signInButton}
              color="primary"
              disabled={!formIsValid}
              fullWidth
              size="large"
              type="submit"
              variant="contained">
              Đăng nhập
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
                Quên mật khẩu?
              </Link>
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {'Chưa có tài khoản? '}
              <Link component={RouterLink} to={routes.SIGN_UP} variant="h5">
                Đăng ký
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
