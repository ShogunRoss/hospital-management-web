import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';

import App from './App';
import graphqlCLient from 'src/utils/graphqlClient';
import store from 'src/redux/store';
import theme from './theme';

ReactDOM.render(
  <ApolloProvider client={graphqlCLient}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
