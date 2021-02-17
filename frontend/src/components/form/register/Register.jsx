import React, { useState } from 'react';
import { useStyles } from '../form-style';
import { Typography } from '@material-ui/core';
import FormInput from '../formcontrols/forminput/FormInput';
import FormButton from '../formcontrols/formbtn/FormBtn';
import { Form } from 'formik';

function Register() {
  const classes = useStyles();
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <Form className={`${classes.form} ${classes.register}`}>
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
        label='Email'
        icon='email'
        type='email'
        name='email'
      />

      <FormInput
        className={classes.inputRoot}
        label='Šifra'
        icon='lock'
        type='password'
        name='password'
      />

      <FormInput
        className={classes.inputRoot}
        label='Potvrdi Šifru'
        icon='lock'
        type='password'
        name='password'
      />

      <FormButton>Register</FormButton>
    </Form>
  );
}

export default Register;
