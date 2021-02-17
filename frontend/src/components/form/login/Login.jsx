import React, { useState } from 'react';
import { useStyles } from '../form-style';
import { Typography } from '@material-ui/core';
import FormButton from '../formcontrols/formbtn/FormBtn';
import FormInput from '../formcontrols/forminput/FormInput';
import { Form } from 'formik';

function Login(props) {
  const classes = useStyles();
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  return (
    <Form className={`${classes.form} ${classes.login}`}>
      <Typography className={classes.formTitle} variant='h2' component='h2'>
        Prijavi se
      </Typography>

      <FormInput
        className={classes.inputRoot}
        label='Korisničko ime'
        icon='user'
        type='text'
        name='username'
      />

      <FormInput
        className={classes.inputRoot}
        label='Šifra'
        icon='lock'
        type='password'
        name='password'
      />

      <FormButton>Prijavi se</FormButton>
    </Form>
  );
}

export default Login;
