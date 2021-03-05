import React from 'react';
import { Typography, Grid } from '@material-ui/core';

function FormTitle(props) {
  const { children } = props;
  return (
    <Grid item xs={12}>
      <Typography variant='h4' component='h1' align='center'>
        {children}
      </Typography>
    </Grid>
  );
}

export default FormTitle;
