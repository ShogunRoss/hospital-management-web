import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';

import App from './App';
import graphqlCLient from 'src/utils/graphqlClient';
import store from 'src/redux/store';

ReactDOM.render(
  <ApolloProvider client={graphqlCLient}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
