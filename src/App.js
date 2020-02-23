import React, { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import { connect } from 'react-redux';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import Routes from './components/Routes';
// import { setAccessToken } from './utils/accessToken';
import { URL } from './common/config';
import meQuery from 'src/utils/meQuery';
import { meActions } from 'src/redux/actions';

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

const App = ({ updateMe }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(URL + '/refresh-token', {
      method: 'POST',
      credentials: 'include'
    }).then(async data => {
      // console.log(data);
      const { accessToken } = await data.json();
      // console.log(accessToken);
      // setAccessToken(accessToken);
      if (accessToken) {
        console.log(accessToken);
        const me = await meQuery(accessToken);
        me.accessToken = accessToken;
        updateMe(me);
      }
      setLoading(false);
    });
  });

  if (loading) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};

const mapDispatchToProps = dispatch => ({
  updateMe: me => {
    dispatch(meActions.updateMe(me));
  }
});

export default connect(null, mapDispatchToProps)(App);
