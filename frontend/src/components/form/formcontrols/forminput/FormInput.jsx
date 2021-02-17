import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { AccountCircle, Lock, Email } from '@material-ui/icons';
import { useField } from 'formik';

const iconSwitch = (iconName) => {
  switch (iconName.toLowerCase()) {
    case 'lock':
      return <Lock />;
    case 'user':
      return <AccountCircle />;
    case 'email':
      return <Email />;
    default:
      break;
  }
};

function FormInput({ name, icon, type, ...rest }) {
  const [field, meta] = useField(name);

  const inputConfig = {
    ...field,
    ...rest,
    variant: 'outlined',
    type: { type },
  };

  if (meta && meta.touched && meta.error) {
    inputConfig.error = true;
    inputConfig.helperText = meta.error;
  }

  return (
    <TextField
      m={2}
      {...inputConfig}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>{iconSwitch(icon)}</InputAdornment>
        ),
      }}
    />
  );
}

export default FormInput;
