import { Button } from '@material-ui/core';
import React from 'react';
import { useFormikContext } from 'formik';
import { useStyles } from '../../user/user_style';

function SubmitBtn(props) {
  const { children } = props;
  const { isValid } = useFormikContext();
  const classes = useStyles();

  const btnConfig = {
    type: 'submit',
    color: 'secondary',
    disabled: !isValid,
    component: 'button',
    variant: 'contained',
  };
  return (
    <Button {...btnConfig} className={classes.submitBtn}>
      {children.toUpperCase()}
    </Button>
  );
}

export default SubmitBtn;
