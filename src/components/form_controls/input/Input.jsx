import React from 'react';
import { useField } from 'formik';
import { InputAdornment, TextField } from '@material-ui/core';
import {
  AccountCircle,
  Face,
  Lock,
  Email,
  Phone,
  Book,
  Image,
  VerifiedUser,
  AccessTime,
} from '@material-ui/icons';

const iconSwitch = (iconName) => {
  switch (iconName.toLowerCase()) {
    case 'lock':
      return <Lock />;
    case 'verify':
      return <VerifiedUser />;
    case 'user':
      return <AccountCircle />;
    case 'face':
      return <Face />;
    case 'email':
      return <Email />;
    case 'phone':
      return <Phone />;
    case 'book':
      return <Book />;
    case 'image':
      return <Image />;
    case 'time':
      return <AccessTime />;
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
