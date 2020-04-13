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
import { connect } from 'react-redux';
import { SIGN_OUT } from 'src/utils/graphqlMutations';
import * as routes from 'src/common/routes';
import { meActions } from 'src/redux/actions';

const useStyles = makeStyles(theme => ({
  root: {},
  actionButtons: {
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2)
  },
  signOutButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.light
    }
  }
}));

const Account = ({ className, history, reduxSignOut, ...rest }) => {
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
    reduxSignOut();
    await client.resetStore();

    history.push(routes.SIGN_IN);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form>
        <CardHeader title="Tài khoản" subheader="Quản lý tài khoản" />
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
        <CardActions className={classes.actionButtons}>
          <Button
            className={classes.signOutButton}
            color="secondary"
            variant="contained"
            onClick={handleSignOut}>
            Đăng xuất
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Account.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object,
  reduxSignOut: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  reduxSignOut: () => {
    dispatch(meActions.signOut());
  }
});

export default connect(null, mapDispatchToProps)(Account);
