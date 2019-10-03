import gql from 'graphql-tag';

// Used for query information of user who signed in
// Can get back all User field - However, if you don't any field, you should not mention it
const ME = gql`
  query {
    me {
      email
      id
    }
  }
`;

// Used for query information of device which has an <id> as input
// Can get back all Device field - However, if you don't any field, you should not mention it
const DEVICE_STATE = gql`
  query Device($id: ID!) {
    device(id: $id) {
      currentState
    }
  }
`;

export { ME, DEVICE_STATE };
