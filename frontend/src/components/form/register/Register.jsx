import React, { useState } from 'react';
import { useStyles } from '../form-style';
import FormInput from '../formcontrols/forminput/FormInput';
import FormButton from '../formcontrols/formbtn/FormBtn';
import FormTitle from '../formcontrols/formtitle/FormTitle';

function Register({ formik }) {
  const classes = useStyles();
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className={classes.formContainer}>
      <div>
        <img
          className={classes.formImg}
          src='/assets/code_thinking.svg'
          alt='Code Thinking'
        />
      </div>

      <FormTitle headerVariant='h3' headerType='h1'>
        Registruj se
      </FormTitle>

      <div className={classes.form}>
        <FormInput
          label='Korisničko ime'
          icon='user'
          type='text'
          name='username'
        />

        <FormInput label='Email' icon='email' type='email' name='email' />

        <FormInput label='Šifra' icon='lock' type='password' name='password' />

        <FormInput
          label='Potvrdi Šifru'
          icon='lock'
          type='password'
          name='password'
        />

        <FormButton>Register</FormButton>
      </div>
    </div>
  );
}

export default Register;
