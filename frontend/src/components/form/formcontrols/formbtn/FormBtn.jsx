import React from 'react';
import { Button } from '@material-ui/core';
import { useStyles } from './formBtn-style';

const FormButton = (props) => {
  const { type, variant, component, children, ...rest } = props;
  const classes = useStyles();
  return (
    <Button
      className={classes.formBtn}
      type={type}
      variant={variant}
      component={component}
      {...rest}
    >
      {children.toUpperCase()}
    </Button>
  );
};

export default FormButton;
