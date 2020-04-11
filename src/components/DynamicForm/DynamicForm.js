import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import validate from 'src/utils/validateOverride';
import { TextField } from '@material-ui/core';
import useStyles from './dynamicFormStyles';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import viLocale from 'date-fns/locale/vi';

const DynamicForm = props => {
  const { formRef, formData, onFormIsValid, autoFocus, error } = props;

  const classes = useStyles();
  const maxDate = new Date('1/1/2100');
  const minDate = new Date('1/1/1970');
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
          minimum:
            field.name === 'password' || field.name === 'confirmPassword'
              ? 3
              : 0
        },
        equality: field.name === 'confirmPassword' && 'password'
      }
    };
    if (field.type === 'year' || field.type === 'date') {
      delete result[field.name].length;
    }
    return result;
  }, {});

  const [formState, setFormState] = useState({
    isValid: false,
    values: formData.reduce(
      (obj, field) => ({
        ...obj,
        [field.name]: field.defaultValue
          ? field.defaultValue
          : field.type === 'date' || field.type === 'year'
          ? Date.now()
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
    console.log(formState.values);
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

  // const handleDateError = (error, name) => {
  // console.log({ error });
  // if (error) {
  //   setFormState(formState => ({
  //     ...formState,
  //     errors: { ...formState.errors, [name]: [error] }
  //   }));
  // }
  // };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  return (
    <Fragment>
      {formData.map((field, index) => {
        if (field.type === 'checkbox') return <div key={field.name} />;
        if (field.type === 'year' || field.type === 'date')
          return (
            <MuiPickersUtilsProvider
              key={field.name}
              utils={DateFnsUtils}
              locale={viLocale}>
              <KeyboardDatePicker
                label={field.label}
                value={formState.values[field.name]}
                format={field.type === 'year' ? 'yyyy' : 'dd/MM/yyyy'}
                name={field.name}
                openTo={field.type}
                views={[field.type]}
                onChange={date => handleDateChange(date, field.name)}
                autoOk
                orientation="landscape"
                inputVariant="outlined"
                variant="inline"
                fullWidth
                margin="normal"
                maxDate={maxDate}
                minDate={minDate}
                maxDateMessage={`${field.label} phải nhỏ hơn ${
                  field.type === 'year'
                    ? maxDate.getFullYear()
                    : maxDate.toLocaleDateString()
                }`}
                minDateMessage={`${field.label} phải lớn hơn ${
                  field.type === 'year'
                    ? minDate.getFullYear()
                    : minDate.toLocaleDateString()
                }`}
                invalidDateMessage={`${
                  field.type === 'year' ? 'Năm' : 'Ngày'
                } không đúng định dạng`}
                required={field.isRequired}
                error={this.error || hasError(field.name)}
                // TextFieldComponent={props => {
                //   console.log(props);
                //   return (
                //     <TextField
                //       {...props}
                //       required={field.isRequired}
                //       helperText={
                //         hasError(field.name)
                //           ? formState.errors[field.name][0]
                //           : null
                //       }
                //       error={hasError(field.name)}
                //     />
                //   );
                // }}
              />
            </MuiPickersUtilsProvider>
          );
        return (
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
