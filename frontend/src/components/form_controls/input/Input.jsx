import React from 'react';
import { useField } from 'formik';
import { InputAdornment, TextField } from '@material-ui/core';
import { AccountCircle, Lock, Email } from '@material-ui/icons';

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

function Input(props) {
  const { label, name, icon, ...rest } = props;
  const [field, meta] = useField(name);

  const inputConfig = {
    label,
    id: name,
    name,
    variant: 'outlined',
    margin: 'normal',
    ...field,
    ...rest,
  };

  if (meta && meta.touched && meta.error) {
    inputConfig.error = true;
    inputConfig.helperText = meta.error;
  }
  return (
    <TextField
      fullWidth
      {...inputConfig}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>{iconSwitch(icon)}</InputAdornment>
        ),
      }}
    />
  );
}

export default Input;
