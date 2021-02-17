import React from 'react';
import { Button } from '@material-ui/core';
import { useFormikContext } from 'formik';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  formBtn: {
    width: '50%',
    marginTop: '15px',
  },
});

const FormButton = (props) => {
  const classes = useStyles();
  const { variant, children, ...rest } = props;

  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const btnConfig = {
    className: classes.formBtn,
    type: 'submit',
    component: 'button',
    variant: 'contained',
    color: 'primary',
    onClick: handleSubmit,
    ...rest,
  };

  return <Button {...btnConfig}>{children.toUpperCase()}</Button>;
};

export default FormButton;
