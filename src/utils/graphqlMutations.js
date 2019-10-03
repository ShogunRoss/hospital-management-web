import gql from 'graphql-tag';

// Used for signing in with email and password
// Get back accessToken when success
const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      accessToken
    }
  }
`;

// Used for signing up with email and password
// Get back true when success
const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password)
  }
`;

// This one is deprecated - The /confirm endpoint is now doing this job.
// Can consider to using this in the future
const CONFIRM_EMAIL = gql`
  mutation ConfirmEmail($confirmToken: String!) {
    confirmEmail(confirmToken: $confirmToken)
  }
`;

//Used for sending an forgot password url to recipient's email
//Get back true when success
const SEND_FORGOT_PASSWORD_EMAIL = gql`
  mutation SendForgotPasswordEmail($email: String!) {
    sendForgotPasswordEmail(email: $email)
  }
`;

//Used for change password when signed in
//Get back true when success
const CHANGE_PASSWORD = gql`
  mutation ChangePassword($newPassword: String!) {
    changePassword(newPassword: $newPassword)
  }
`;

//Used for reset password within forgot password url
//Get back true when success
const RESET_PASSWORD = gql`
  mutation ResetPassword($newPassword: String!, $passwordToken: String!) {
    resetPassword(newPassword: $newPassword, passwordToken: $passwordToken)
  }
`;

//Used for signing out
//Get back true when success
const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

export {
  SIGN_IN,
  SIGN_UP,
  CONFIRM_EMAIL,
  SEND_FORGOT_PASSWORD_EMAIL,
  CHANGE_PASSWORD,
  RESET_PASSWORD,
  SIGN_OUT
};
