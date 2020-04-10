import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
  Divider,
  Button,
  CardActions
} from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { getInitials } from 'src/helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  bioInfo: {
    width: '75%',
    padding: theme.spacing(1)
  },
  avatar: {
    backgroundColor: theme.palette.primary.dark,
    backgroundPosition: '50% 50%',
    height: 'auto',
    width: 100
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  },
  actionButtons: {
    justifyContent: 'space-around'
  },
  deleteAvatarButton: {
    color: theme.palette.error.main
  }
}));

const UserBio = props => {
  const classes = useStyles();
  const { className, profile, ...rest } = props;
  const user = {
    name: profile.name,
    employeeId: profile.employeeId,
    email: profile.email,
    role: profile.role,
    createdAt: profile.createdAt,
    phone: profile.phone,
    avatar: profile.avatar
  };
  const profileArray = Object.values(user);
  const finishRate = Math.ceil(
    (profileArray.reduce((accum, field) => accum + (field !== null), 0) /
      profileArray.length) *
      100
  );

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div className={classes.bioInfo}>
            <Typography noWrap gutterBottom variant="h2">
              {user.name}
            </Typography>
            <Typography noWrap color="textSecondary" variant="body2">
              MSNV: {user.employeeId}
            </Typography>
            <Typography noWrap color="textSecondary" variant="body1">
              Email: {user.email}
            </Typography>
            <Typography noWrap color="textSecondary" variant="body2">
              Vai trò: {user.role}
            </Typography>
            {profile.phone && (
              <Typography noWrap color="textSecondary" variant="body2">
                Số điện thoại: {user.phone}
              </Typography>
            )}
            <Typography noWrap color="textSecondary" variant="body2">
              Ngày tạo: {user.createdAt}
            </Typography>
          </div>
          <Avatar
            variant="rounded"
            className={classes.avatar}
            src={user.avatar}>
            {getInitials(user.name)}
          </Avatar>
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">Mức độ đầy đủ: {finishRate}%</Typography>
          <LinearProgress value={finishRate} variant="determinate" />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actionButtons}>
        <Button className={classes.uploadButton} color="primary" variant="text">
          Thay ảnh đại diện
        </Button>
        <Button variant="text" className={classes.deleteAvatarButton}>
          Xóa ảnh đại diện
        </Button>
      </CardActions>
    </Card>
  );
};

UserBio.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object
};

export default UserBio;
