import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect, Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';

import { RouteWithLayout } from 'src/components';
import { Main as MainLayout, Minimal as MinimalLayout } from 'src/layouts';
import * as routes from 'src/common/routes';

import {
  Dashboard as DashboardView,
  DeviceList as DeviceListView,
  UserList as UserListView,
  // Typography as TypographyView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  ForgotPassword as ForgotPasswordView,
  ConfirmNotification as ConfirmNotificationView,
  ResetPassword as ResetPasswordView,
  Landing as LandingView,
  Policy as PolicyView
} from 'src/views';

export const history = createBrowserHistory();
const { pathname } = history.location;

const Routes = ({ accessToken }) => {
  const authRoutes = [routes.SIGN_IN, routes.SIGN_UP, routes.FORGOT_PASSWORD];
  // console.log(pathname);

  return (
    <Router history={history}>
      <Switch>
        {accessToken && (
          <Redirect exact from={routes.ADMIN} to={routes.DASHBOARD} />
        )}

        {accessToken && authRoutes.includes(pathname) && (
          <Redirect from={pathname} to={routes.DASHBOARD} />
        )}

        {!accessToken && <Redirect from={routes.ADMIN} to={routes.SIGN_IN} />}

        <Route exact component={LandingView} path={routes.HOME} />

        <Route exact component={PolicyView} path={routes.POLICY} />

        <RouteWithLayout
          component={NotFoundView}
          exact
          layout={MinimalLayout}
          path={routes.NOT_FOUND}
        />
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MinimalLayout}
          path={routes.SIGN_IN}
        />
        <RouteWithLayout
          component={SignUpView}
          exact
          layout={MinimalLayout}
          path={routes.SIGN_UP}
        />
        <RouteWithLayout
          component={ForgotPasswordView}
          exact
          layout={MinimalLayout}
          path={routes.FORGOT_PASSWORD}
        />
        <RouteWithLayout
          component={ConfirmNotificationView}
          layout={MinimalLayout}
          path={routes.CONFIRM_NOTIFICATION + '/:confirmToken'}
        />
        <RouteWithLayout
          component={ResetPasswordView}
          layout={MinimalLayout}
          path={routes.RESET_PASSWORD + '/:passwordToken'}
        />

        <RouteWithLayout
          component={DashboardView}
          exact
          layout={MainLayout}
          path={routes.DASHBOARD}
        />
        <RouteWithLayout
          component={UserListView}
          exact
          layout={MainLayout}
          path={routes.USERS}
        />
        <RouteWithLayout
          component={DeviceListView}
          exact
          layout={MainLayout}
          path={routes.DEVICES}
        />
        {/* <RouteWithLayout
          component={TypographyView}
          exact
          layout={MainLayout}
          path={routes.EVENTS}
        /> */}
        <RouteWithLayout
          component={SettingsView}
          exact
          layout={MainLayout}
          path={routes.SETTINGS}
        />
        <Redirect to={routes.NOT_FOUND} />
      </Switch>
    </Router>
  );
};

Routes.propTypes = {
  accessToken: PropTypes.string
};

const mapStateToProps = state => state.me;

export default connect(mapStateToProps)(Routes);
