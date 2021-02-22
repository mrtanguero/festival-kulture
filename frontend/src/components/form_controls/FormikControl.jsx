import React from 'react';
import Input from './input/Input';
import RadioButton from './radio/RadioButton';
import Date from './date/Date';

function FormikControl(props) {
  const { control, ...rest } = props;

  switch (control) {
    case 'input':
      return <Input {...rest} />;
    case 'radio':
      return <RadioButton {...rest} />;
    case 'date':
      return <Date {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
