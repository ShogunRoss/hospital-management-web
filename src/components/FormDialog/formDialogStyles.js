import { makeStyles } from '@material-ui/styles';

export default makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    minWidth: theme.spacing(50)
  },
  continueButton: {
    minWidth: theme.spacing(15)
  },
  actionButtons: {
    padding: theme.spacing(1, 3)
  }
}));
