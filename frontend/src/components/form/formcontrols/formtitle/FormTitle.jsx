import React from 'react';
import { useStyles } from './formTitle-style';
import { Typography } from '@material-ui/core';

function FormTitle(props) {
  const { headerVariant, headerType, children } = props;
  const classes = useStyles();
  return (
    <Typography
      className={classes.formTitle}
      variant={headerVariant}
      component={headerType}
    >
      {children}
    </Typography>
  );
}

export default FormTitle;
