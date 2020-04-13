import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import viLocale from 'date-fns/locale/vi';
import { TextField } from '@material-ui/core';

/* eslint-disable react/display-name */
const DateField = props => {
  const { field, value, onChange, helperText, error } = props;

  const maxDate = new Date('1/1/2100');
  const minDate = new Date('1/1/1970');
  const maxDateMessage = `${field.label} phải nhỏ hơn ${
    field.type === 'year' ? maxDate.getFullYear() : maxDate.toLocaleDateString()
  }`;
  const minDateMessage = `${field.label} phải lớn hơn ${
    field.type === 'year' ? minDate.getFullYear() : minDate.toLocaleDateString()
  }`;

  const invalidDateMessage = `${
    field.type === 'year' ? 'Năm' : 'Ngày'
  } không đúng định dạng`;

  const dateProps = {
    label: field.label,
    value,
    format: field.type === 'year' ? 'yyyy' : 'dd/MM/yyyy',
    name: field.name,
    openTo: field.type,
    views: [field.type],
    onChange,
    autoOk: true,
    orientation: 'landscape',
    inputVariant: 'outlined',
    variant: 'inline',
    fullWidth: true,
    margin: 'normal',
    maxDate,
    minDateMessage,
    emptyLabel: '(Không rõ)',
    maxDateMessage,
    invalidDateMessage,
    required: field.isRequired
  };

  if (error) {
    dateProps.error = error;
    dateProps.helperText = helperText;
  } else {
    delete dateProps.error;
    delete dateProps.helperText;
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
      <KeyboardDatePicker {...dateProps} />
    </MuiPickersUtilsProvider>
  );
};

DateField.propTypes = {
  field: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object
  ]),
  helperText: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func
};

export default DateField;
