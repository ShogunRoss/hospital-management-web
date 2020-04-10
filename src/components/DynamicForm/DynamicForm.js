import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import validate from 'src/utils/validateOverride';
import { TextField } from '@material-ui/core';
import useStyles from './dynamicFormStyles';

const DynamicForm = props => {
  const { formRef, formData, onFormIsValid, autoFocus, error } = props;
  const classes = useStyles();
  const schema = formData.reduce(
    (obj, field) => ({
      ...obj,
      [field.name]: {
        presence: { allowEmpty: !field.isRequired, message: 'là bắt buộc' },
        email: field.name === 'email',
        length: {
          maximum: 64,
          minimum:
            field.name === 'password' || field.name === 'confirmPassword'
              ? 3
              : 0
        },
        equality: field.name === 'confirmPassword' && 'password'
      }
    }),
    {}
  );

  const [formState, setFormState] = useState({
    isValid: false,
    values: formData.reduce(
      (obj, field) => ({
        ...obj,
        [field.name]: field.defaultValue ? field.defaultValue : ''
      }),
      {}
    ),
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);
    const isValid = errors ? false : true;
    isValid !== formState.isValid && onFormIsValid && onFormIsValid(isValid);
    setFormState(formState => ({
      ...formState,
      isValid,
      errors: errors || {}
    }));

    // console.log(ref);
    formRef.current = formState.values;
  }, [formState.values]);

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  return (
    <Fragment>
      {formData.map((field, index) => (
        <TextField
          inputProps={{ className: classes.input }}
          autoFocus={autoFocus && index === 0}
          key={field.name}
          margin="normal"
          name={field.name}
          label={field.label}
          type={field.type}
          onChange={handleChange}
          required={field.isRequired}
          helperText={
            hasError(field.name) ? formState.errors[field.name][0] : null
          }
          error={hasError(field.name)}
          value={formState.values[field.name] || ''}
          variant="outlined"
          fullWidth
        />
      ))}
    </Fragment>
  );
};

DynamicForm.propTypes = {
  formRef: PropTypes.shape({ current: PropTypes.object }),
  formData: PropTypes.array,
  onFormIsValid: PropTypes.func,
  error: PropTypes.object,
  autoFocus: PropTypes.bool
};

export default DynamicForm;
