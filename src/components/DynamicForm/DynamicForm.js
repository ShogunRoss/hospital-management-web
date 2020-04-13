import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import validate from 'src/utils/validateOverride';
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from '@material-ui/core';
import useStyles from './dynamicFormStyles';
import DateField from '../DateField';

const DynamicForm = props => {
  const { formRef, formData, onFormIsValid, autoFocus, error } = props;

  const classes = useStyles();
  const schema = formData.reduce((obj, field) => {
    const result = {
      ...obj,
      [field.name]: {
        presence: {
          allowEmpty: !field.isRequired,
          message: `^${field.label} là bắt buộc`
        },
        email: field.name === 'email',
        length: {
          maximum: 128,
          minimum: ['oldPassword', 'password', 'confirmPassword'].includes(
            field.name
          )
            ? 3
            : 0,
          tooShort: `^${field.label} phải có tối thiểu %{count} ký tự`,
          tooLong: `^${field.label} phải có tối đa %{count} ký tự`,
          notValid: `^${field.label} không hợp lệ`
        },
        equality: field.name === 'confirmPassword' && 'password'
      }
    };
    if (
      field.type === 'year' ||
      field.type === 'date' ||
      field.type === 'select'
    ) {
      delete result[field.name].length;
    }
    return result;
  }, {});

  const [formState, setFormState] = useState({
    isValid: false,
    values: formData.reduce(
      (obj, field) => ({
        ...obj,
        [field.name]:
          field.defaultValue !== undefined
            ? field.defaultValue
            : field.type === 'date' || field.type === 'year'
            ? Date.now()
            : field.type === 'select'
            ? true
            : ''
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

  const handleDateChange = (date, name) => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [name]: date
      },
      touched: {
        ...formState.touched,
        [name]: true
      }
    }));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Fragment>
      {formData.map((field, index) => {
        // if (field.type === 'checkbox') return <div key={field.name} />;
        if (field.type === 'year' || field.type === 'date')
          return (
            <DateField
              key={field.name}
              onChange={date => handleDateChange(date, field.name)}
              field={field}
              value={formState.values[field.name]}
              helperText={
                hasError(field.name) ? formState.errors[field.name][0] : null
              }
              error={hasError(field.name)}
            />
          );
        if (field.type === 'select')
          return (
            <FormControl
              variant="outlined"
              key={field.name}
              fullWidth
              margin="normal"
              // className={classes.formControl}>
            >
              <InputLabel id="select-label">{field.label}</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                name={field.name}
                value={formState.values[field.name]}
                onChange={handleChange}
                label={field.label}>
                <MenuItem value={Boolean(1)}>Mới</MenuItem>
                <MenuItem value={Boolean(0)}>Cũ</MenuItem>
              </Select>
            </FormControl>
          );

        return (
          <TextField
            inputProps={{ className: classes.input, type: field.type }}
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
        );
      })}
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
