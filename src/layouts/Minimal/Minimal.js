import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

import { Topbar } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 64,
    height: '100%'
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  }
}));

const Minimal = props => {
  const { children } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Topbar />
      <main className={classes.content}>
        <Grid className={classes.grid} container>
          <Grid className={classes.quoteContainer} item lg={5}>
            <div className={classes.quote}>
              {/* <div className={classes.quoteInner}>
                <Typography className={classes.quoteText} variant="h1">
                  Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
                  they sold out High Life.
                </Typography>
                <div className={classes.person}>
                  <Typography className={classes.name} variant="body1">
                    Takamaru Ayako
                  </Typography>
                  <Typography className={classes.bio} variant="body2">
                    Manager at inVision
                  </Typography>
                </div>
              </div> */}
            </div>
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            {children}
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

Minimal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Minimal;
