import gql from 'graphql-tag';

const ME = gql`
  {
    me {
      email
      id
    }
  }
`;

const DEVICE_STATE = gql`
  query Device($id: ID!) {
    device(id: $id) {
      currentState
    }
  }
`;

export { ME, DEVICE_STATE };
