import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import useStyles from './landingStyles';
import * as routes from 'src/common/routes';

const Landing = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Typography className={classes.title} align="center" variant="h1">
          HỆ THỐNG QUẢN LÝ THIẾT BỊ VẬT TƯ BỆNH VIỆN
        </Typography>
        <Typography className={classes.subTitle} align="center" variant="h5">
          Trải nghiệm một nền tảng giúp việc quản lý thiết bị vật tư trong bệnh
          viện của bạn một cách dễ dàng hơn
        </Typography>
        <Button
          color="primary"
          variant="contained"
          size="large"
          className={classes.button}
          component={RouterLink}
          to={routes.ADMIN}>
          Dashboard
        </Button>
        {/* <Typography variant="body2" color="inherit" className={classes.more}>
          Manage your hospital facilities
        </Typography> */}
        <div className={classes.backdrop} />
        <div className={classes.background} />
      </Container>
    </div>
  );
};

export default Landing;
