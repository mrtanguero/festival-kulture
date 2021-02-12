import React, { useState } from 'react';
import { useStyles } from '../form-style';
import FormButton from '../formcontrols/formbtn/FormBtn';
import FormInput from '../formcontrols/forminput/FormInput';
import FormTitle from '../formcontrols/formtitle/FormTitle';

function Login(props) {
  const classes = useStyles();
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  return (
    <div className={classes.formContainer}>
      <div>
        <img
          className={classes.formImg}
          src='/assets/mobile_app.svg'
          alt='Code Thinking'
        />
      </div>

      <FormTitle headerVariant='h2' headerType='h2'>
        Prijavi se
      </FormTitle>

      <div className={classes.form}>
        <FormInput
          label='Korisničko ime'
          icon='user'
          type='text'
          name='username'
        />

        <FormInput label='Šifra' icon='lock' type='password' name='password' />

        <FormButton>Prijavi se</FormButton>
      </div>
    </div>
  );
}

export default Login;
