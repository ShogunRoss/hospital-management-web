import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  content: {
    minWidth: 300
  }
}));

const AlertDialog = props => {
  const {
    open,
    title,
    contentText,
    content,
    cancelText,
    handleCancel,
    continueText,
    handleContinue,
    ...rest
  } = props;

  const classes = useStyles();

  return (
    <Dialog
      {...rest}
      onClose={handleCancel}
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent className={classes.content}>
        {contentText && (
          <DialogContentText id="alert-dialog-description">
            {contentText}
          </DialogContentText>
        )}
        {content}
      </DialogContent>
      <DialogActions>
        {handleCancel && <Button onClick={handleCancel}>{cancelText}</Button>}
        {handleContinue && (
          <Button onClick={handleContinue} color="primary" autoFocus>
            {continueText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

AlertDialog.propTypes = {
  cancelText: PropTypes.string,
  contentText: PropTypes.string,
  content: PropTypes.node,
  continueText: PropTypes.string,
  handleCancel: PropTypes.func,
  handleContinue: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string
};

AlertDialog.defaultProps = {
  open: true,
  title: '',
  content: '',
  cancelText: 'Cancel',
  continueText: 'Continue'
};

export default AlertDialog;
