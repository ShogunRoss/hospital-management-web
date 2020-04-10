import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import 'react-perfect-scrollbar/dist/css/styles.css';
import Routes from './components/Routes';
import { URL } from './common/config';
import meQuery from 'src/utils/meQuery';
import { meActions } from 'src/redux/actions';
import './App.css';

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

  return <Routes />;
};

const mapDispatchToProps = dispatch => ({
  updateMe: me => {
    dispatch(meActions.updateMe(me));
  }
});

export default connect(null, mapDispatchToProps)(App);
