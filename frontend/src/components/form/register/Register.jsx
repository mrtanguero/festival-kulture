import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '../formcontrols/forminput/FormInput';
import FormButton from '../formcontrols/formbtn/FormBtn';
import FormTitle from '../formcontrols/formtitle/FormTitle';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStyles } from '../form-style';
import { registerValidation } from './registerValidation';

function Register(props) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(registerValidation),
  });

  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <div className={classes.formContainer}>
      <FormTitle headerVariant='h3' headerType='h1'>
        Registruj se
      </FormTitle>
      <form
        className={classes.formRoot}
        onSubmit={handleSubmit((d) => console.log(d))}
      >
        <FormInput
          label='Username'
          variant='outlined'
          value={username}
          icon='user'
          type='text'
          name='username'
          onChange={(e) => setUsername(e.target.value)}
          helperText={errors.username?.message}
        />

        <FormInput
          label='Email'
          variant='outlined'
          value={email}
          icon='email'
          type='email'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          helperText={errors.username?.message}
        />

        <FormInput
          label='Password'
          variant='outlined'
          value={password}
          icon='lock'
          type='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          helperText={errors.password?.message}
        />

        <FormInput
          label='Confirm Password'
          variant='outlined'
          value={confirmPassword}
          icon='lock'
          type='password'
          name='password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          helperText={errors.password?.message}
        />

        <FormButton
          type='submit'
          variant='contained'
          component='button'
          color='primary'
        >
          Register
        </FormButton>
      </form>
    </div>
  );
}

export default Register;
