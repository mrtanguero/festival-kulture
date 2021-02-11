import React from 'react';
import { Button } from '@material-ui/core';
import { useFormikContext } from 'formik';
import { useStyles } from './formBtn-style';

const FormButton = (props) => {
  const { variant, children, ...rest } = props;
  const classes = useStyles();

  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const btnConfig = {
    type: 'submit',
    component: 'button',
    variant: 'contained',
    color: 'primary',
    onClick: handleSubmit,
    ...rest,
  };

  return (
    <Button className={classes.formBtn} {...btnConfig}>
      {children.toUpperCase()}
    </Button>
  );
};

export default FormButton;
