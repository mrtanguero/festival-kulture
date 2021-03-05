import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import djangoAPI from '../api/djangoAPI';

import { useStyles } from './login_register-style';
import { Button, Typography, Grid, Paper } from '@material-ui/core';
import Input from '../components/form_controls/input/Input';
import GoogleeLogin from '../components/google_login/GoogleLogin';
import FormAvatar from '../components/form_controls/avatar/FormAvatar';

const INITIAL_VALUES = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const PASSWORD_CONFIG = {
  lowercase: '^(?=.*[a-z])',
  uppercase: '^(?=.*[A-Z])',
  number: '^(?=.*[0-9])',
};

const REGISTER_VALIDATION = yup.object({
  username: yup.string().required('Korisničko ime je obavezno'),
  email: yup
    .string()
    .lowercase('Email unesite malim slovima')
    .email('Email mora biti validan')
    .required('Email je obavezan'),
  password: yup
    .string()
    .matches(PASSWORD_CONFIG.lowercase, 'Šira mora imati malo slovo')
    .matches(PASSWORD_CONFIG.uppercase, 'Šifra mora imati veliko slovo')
    .matches(PASSWORD_CONFIG.number, 'Šifra mora imati broj')
    .matches(
      '^(?=.*[@$!%*#?&])',
      'Šifra mora imati specijalni karakter (@$!%*#?&)'
    )
    .min(
      8,
      ({ min, value }) =>
        `Šifa mora imati minimum 8 znakova, još ${min - value.length} `
    )
    .max(
      16,
      ({ max, value }) =>
        `Šifra može imati najviše 16 znakova, unijeli ste ${
          value.length - max
        } više`
    )
    .required('Šifra je obavezna'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Šifre se ne podudaraju')
    .required('Morate potvrditi šifru'),
});

function Register() {
  const classes = useStyles();

  const onSubmit = async (values, onSubmitProps) => {
    console.log(values, onSubmitProps);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
    // const response = await djangoAPI.post('/register/', {
    //   'username': values.username,
    //   'password': values.password
    // })
    // console.log(response);
    // TODO: Home page after valid login (history?)
  };
  return (
    <Grid style={{ height: '80vh' }}>
      <Paper elevation={10} className={classes.paperRoot}>
        <Grid align='center'>
          <FormAvatar icon='circle' className={classes.formAvatar} />

          <Typography variant='h4' component='h2' className={classes.formTitle}>
            REGISTRUJ SE
          </Typography>
        </Grid>

        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={REGISTER_VALIDATION}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <Input
                  type='text'
                  label='Korisničko ime'
                  name='username'
                  icon='user'
                  placeholder='kimosabe13'
                />

                <Input
                  type='email'
                  label='Email'
                  name='email'
                  icon='email'
                  placeholder='test@mail.com'
                />

                <Input
                  type='password'
                  label='Šifra'
                  name='password'
                  icon='lock'
                />

                <Input
                  type='password'
                  label='Potvrdi šifru'
                  name='confirmPassword'
                  icon='lock'
                />

                <Button
                  type='submit'
                  disabled={!formik.isValid}
                  component='button'
                  variant='contained'
                  fullWidth
                  className={classes.submitBtn}
                >
                  POTVRDI
                </Button>
              </Form>
            );
          }}
        </Formik>

        <Typography className={classes.formRedirect}>
          Imaš nalog <Link to='/login'>Prijavi se</Link>
        </Typography>

        <GoogleeLogin />
      </Paper>
    </Grid>
  );
}

export default Register;
