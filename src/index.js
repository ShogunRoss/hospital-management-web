import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, Observable } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { InMemoryCache } from 'apollo-cache-inmemory';
import jwtDecode from 'jwt-decode';

import App from './App';
import { getAccessToken, setAccessToken } from 'utils/accessToken';
import { URL } from 'common/config';

const httpLink = new HttpLink({
  uri: URL + '/graphql',
  credentials: 'include'
});

const authLink = new ApolloLink(
  (operation, foward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(operation => {
          const accessToken = getAccessToken();

          accessToken &&
            operation.setContext({
              headers: {
                authorization: `Bearer ${accessToken}`
              }
            });
        })
        .then(() => {
          handle = foward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        handle && handle.unsubscribe();
      };
    })
);

const refreshTokenLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();

    if (!token) {
      return true;
    }

    try {
      const { exp } = jwtDecode(token);
      return !(Date.now() >= exp * 1000);
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch(URL + '/refresh-token', {
      method: 'POST',
      credentials: 'include'
    });
  },
  handleFetch: accessToken => {
    setAccessToken(accessToken);
  },
  handleError: err => {
    console.warn('Your refresh token is invalid. Try to relogin');
    console.error(err);
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  graphQLErrors &&
    graphQLErrors.forEach(({ message }) => {
      console.log('GraphQL error', message);
    });

  networkError && console.log('Network error', networkError);
});

const link = ApolloLink.from([refreshTokenLink, authLink, errorLink, httpLink]);
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
