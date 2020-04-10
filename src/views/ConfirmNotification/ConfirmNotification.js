import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    height: '100%'
  },
  content: {
    textAlign: 'center',
    '-ms-transform': 'translateY(50%)',
    transform: 'translateY(50%)'
  },
  image: {
    marginTop: 42,
    marginLeft: 42,
    display: 'inline-block',
    maxWidth: '100%',
    width: 250,
    '-webkit-filter': 'drop-shadow( 3px 3px 3px rgba(0, 0, 0, .3))',
    filter: 'drop-shadow( 3px 3px 3px rgba(0, 0, 0, .3))'
  },
  buttonDirect: {
    color: theme.palette.neutral,
    marginTop: theme.spacing(4)
  }
}));

const ConfirmNotification = props => {
  const classes = useStyles();
  const { confirmToken } = props.match.params;
  console.log(confirmToken);

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item>
          <div className={classes.content}>
            <Typography variant="h1">Xác nhận email thành công!</Typography>
            <img
              alt="Under development"
              className={classes.image}
              src="/images/completed_task.svg"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

ConfirmNotification.propTypes = {
  match: PropTypes.object
};

export default ConfirmNotification;
