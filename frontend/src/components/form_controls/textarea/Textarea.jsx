import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

function Textarea(props) {
  const { name, ...rest } = props;
  const [field, meta] = useField(name);
  const textareaConfig = {
    name,
    ...field,
    ...rest,
    fullWidth: true,
    type: 'textarea',
    multiline: true,
    rows: 5,
    variant: 'outlined',
  };

  if (meta && meta.touched && meta.error) {
    textareaConfig.error = true;
    textareaConfig.helperText = meta.error;
  }

  return <TextField {...textareaConfig} />;
}

export default Textarea;
