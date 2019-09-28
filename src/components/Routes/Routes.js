import React from 'react';
import { Switch, Redirect, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { RouteWithLayout } from 'components';
import { Main as MainLayout, Minimal as MinimalLayout } from 'layouts';
import * as routes from 'common/routes';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  ForgotPassword as ForgotPasswordView,
  ConfirmNotification as ConfirmNotificationView,
  ResetPassword as ResetPasswordView,
  Landing as LandingView
} from 'views';
import { getAccessToken } from 'utils/accessToken';

const browserHistory = createBrowserHistory();
const { pathname } = browserHistory.location;

const Routes = () => {
  let token = getAccessToken();

  const authRoutes = [routes.SIGN_IN, routes.SIGN_UP, routes.FORGOT_PASSWORD];

  return (
    <Router history={browserHistory}>
      <Switch>
        {/* Because we do not have landing page yet */}
        {/* <Redirect exact from={routes.HOME} to={routes.ADMIN} /> */}

        {token && <Redirect exact from={routes.ADMIN} to={routes.DASHBOARD} />}

        {token && authRoutes.includes(pathname) && (
          <Redirect from={pathname} to={routes.DASHBOARD} />
        )}

        {!token && !authRoutes.includes(pathname) && (
          <Redirect from={routes.ADMIN} to={routes.SIGN_IN} />
        )}

        <RouteWithLayout
          exact
          component={LandingView}
          layout={MainLayout}
          path={routes.HOME}
        />

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
          component={ProductListView}
          exact
          layout={MainLayout}
          path={routes.DEVICES}
        />
        <RouteWithLayout
          component={TypographyView}
          exact
          layout={MainLayout}
          path={routes.EVENTS}
        />
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

export default Routes;
