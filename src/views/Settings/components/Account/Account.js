import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  // CardContent,
  CardActions,
  Divider,
  // TextField,
  Button
} from '@material-ui/core';
import { useMutation } from 'react-apollo';

import { setAccessToken } from 'utils/accessToken';
import { SIGN_OUT } from 'utils/graphqlMutations';
import * as routes from 'common/routes';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Account = props => {
  const { className, history, ...rest } = props;

  const classes = useStyles();

  // const [values, setValues] = useState({
  //   password: '',
  //   confirm: ''
  // });

  // const handleChange = event => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value
  //   });
  // };

  const [signOut, { client }] = useMutation(SIGN_OUT);

  const handleSignOut = async () => {
    await signOut();
    setAccessToken('');
    await client.resetStore();

    history.push(routes.SIGN_IN);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form>
        <CardHeader title="Account" subheader="Manage Account" />
        <Divider />
        {/* <CardContent>
          <TextField
            fullWidth
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            name="confirm"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider /> */}
        <CardActions>
          <Button color="secondary" variant="outlined" onClick={handleSignOut}>
            SIGN OUT
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Account.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object
};

export default Account;
