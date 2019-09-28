import React, { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './components/Routes';
import { setAccessToken } from 'utils/accessToken';
import { URL } from 'common/config';

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(URL + '/refresh-token', {
      method: 'POST',
      credentials: 'include'
    }).then(async data => {
      const { accessToken } = await data.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes />;
    </ThemeProvider>
  );
};

export default App;
