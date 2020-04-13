import { makeStyles } from '@material-ui/core';

const backgroundImage = '/images/undraw_medicine_b1ol.svg';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: '100vh',
      minHeight: 500,
      maxHeight: 2000
    }
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    zIndex: -2
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    zIndex: -1
  },
  button: {
    minWidth: 200
  },
  image: {
    display: 'inline-block',
    maxWidth: '100%',
    width: 320
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10)
    }
  },
  more: {
    marginTop: theme.spacing(2)
  },
  title: {
    color: theme.palette.primary.light,
    marginBottom: theme.spacing(2)
  },
  subTitle: {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2)
  }
}));

export default useStyles;
