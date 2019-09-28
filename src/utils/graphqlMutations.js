import gql from 'graphql-tag';

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      accessToken
    }
  }
`;

const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password)
  }
`;

const CONFIRM_EMAIL = gql`
  mutation ConfirmEmail($confirmToken: String!) {
    confirmEmail(confirmToken: $confirmToken)
  }
`;

const CREATE_EVENT = gql`
  mutation CreateEvent($deviceId: ID!) {
    createEvent(deviceId: $deviceId) {
      action
    }
  }
`;

const SEND_FORGOT_PASSWORD_EMAIL = gql`
  mutation SendForgotPasswordEmail($email: String!) {
    sendForgotPasswordEmail(email: $email)
  }
`;

const CHANGE_PASSWORD = gql`
  mutation ChangePassword($newPassword: String!) {
    changePassword(newPassword: $newPassword)
  }
`;

const RESET_PASSWORD = gql`
  mutation ResetPassword($newPassword: String!, $passwordToken: String!) {
    resetPassword(newPassword: $newPassword, passwordToken: $passwordToken)
  }
`;

const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

export {
  SIGN_IN,
  SIGN_UP,
  CONFIRM_EMAIL,
  CREATE_EVENT,
  SEND_FORGOT_PASSWORD_EMAIL,
  CHANGE_PASSWORD,
  RESET_PASSWORD,
  SIGN_OUT
};
