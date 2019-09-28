import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertDialog = props => {
  const {
    open,
    title,
    content,
    cancelText,
    handleCancel,
    continueText,
    handleContinue
  } = props;
  return (
    <Dialog
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {handleCancel && (
          <Button onClick={handleCancel} color="primary">
            {cancelText}
          </Button>
        )}
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
  content: PropTypes.string,
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
