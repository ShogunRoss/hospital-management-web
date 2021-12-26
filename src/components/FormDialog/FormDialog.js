import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress
} from '@material-ui/core';
import useStyles from './formDialogStyles';
import DynamicForm from '../DynamicForm';

const FormDialog = props => {
  const {
    open,
    title,
    formData,
    cancelText,
    handleCancel,
    continueText,
    handleContinue,
    description,
    isLoading,
    error,
    ...rest
  } = props;

  const classes = useStyles();
  const [formIsValid, setFormIsValid] = useState(false);
  const formRef = useRef(null);

  const _handleCancel = () => {
    handleCancel && handleCancel();
  };

  const _handleContinue = event => {
    event.preventDefault();
    delete formRef.current.confirmPassword;
    formData.forEach(field => {
      if (field.type === 'year' || field.type === 'date') {
        formRef.current[field.name] = !formRef.current[field.name]
          ? null
          : field.type === 'year'
          ? new Date(formRef.current[field.name]).getFullYear().toString()
          : new Date(formRef.current[field.name]);
      }
      if (field.type === 'number')
        formRef.current[field.name] = parseFloat(formRef.current[field.name]);
    });

    handleContinue && handleContinue(formRef.current);
    // setOpen(false);
  };

  return (
    <Dialog
      {...rest}
      onClose={handleCancel}
      open={open}
      aria-labelledby="form-dialog-title"
      aria-describedby="form-dialog-description">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <form onSubmit={handleContinue} autoComplete="off">
        <DialogContent className={classes.content}>
          <DialogContentText id="form-dialog-description">
            {description}
          </DialogContentText>
          <DynamicForm
            formRef={formRef}
            formData={formData}
            onFormIsValid={setFormIsValid}
            autoFocus
            error={error}
          />
        </DialogContent>
        <DialogActions className={classes.actionButtons}>
          <Button onClick={_handleCancel}>{cancelText}</Button>
          <Button
            className={classes.continueButton}
            type="submit"
            variant="contained"
            disabled={!formIsValid}
            color="primary"
            onClick={_handleContinue}>
            {isLoading ? (
              <CircularProgress color="secondary" size={24} />
            ) : (
              continueText
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

FormDialog.propTypes = {
  cancelText: PropTypes.string,
  content: PropTypes.string,
  continueText: PropTypes.string,
  handleCancel: PropTypes.func,
  handleContinue: PropTypes.func,
  open: PropTypes.bool,
  formData: PropTypes.array,
  title: PropTypes.string,
  description: PropTypes.string,
  isLoading: PropTypes.bool,
  error: PropTypes.object
};

FormDialog.defaultProps = {
  open: true,
  title: '',
  content: '',
  cancelText: 'Cancel',
  continueText: 'Continue',
  isLoading: false
};

export default FormDialog;
