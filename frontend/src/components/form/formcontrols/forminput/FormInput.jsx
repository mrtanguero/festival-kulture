import React from 'react';
import { useStyles } from './formInput-style';
import { TextField, InputAdornment } from '@material-ui/core';
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

function FormInput(props) {
  const { label, variant, value, icon, type, name, ...rest } = props;
  const classes = useStyles();

  return (
    <TextField
      className={classes.inputRoot}
      label={label}
      variant={variant}
      defaultValue={value}
      inputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            {() => iconSwitch(icon)}
          </InputAdornment>
        ),
        type: { type },
        name: { name },
      }}
      {...rest}
    />
  );
}

export default FormInput;
