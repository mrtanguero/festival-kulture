import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStyles } from '../form-style';
import FormButton from '../formcontrols/formbtn/FormBtn';
import FormInput from '../formcontrols/forminput/FormInput';
import FormTitle from '../formcontrols/formtitle/FormTitle';
import { loginValidation } from './loginValidation';

function Login(props) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginValidation),
  });

  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <div className={classes.formContainer}>
      <FormTitle headerVariant='h2' headerType='h2'>
        Prijavi se
      </FormTitle>
      <form
        className={classes.formRoot}
        onSubmit={handleSubmit((d) => console.log(d))}
      >
        <FormInput
          label='Username'
          variant='outlined'
          defaultValue={username}
          icon='user'
          type='text'
          name='username'
          onChange={(e) => setUsername(e.target.value)}
          helperText={errors.username?.message}
        />

        <FormInput
          label='Password'
          variant='outlined'
          value={password}
          icon='lock'
          type='password'
          name='password'
          helperText={errors.password?.message}
          onChange={(e) => setPassword(e.target.value)}
        />

        <FormButton
          type='submit'
          variant='contained'
          component='button'
          color='primary'
        >
          Prijavi se
        </FormButton>
      </form>
    </div>
  );
}

export default Login;
