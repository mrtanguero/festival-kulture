import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
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
  lowercase: '/(?=.*[a-z])/',
  uppercase: '/?=.*[A-Z])/',
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
    .matches('^(?=.*[a-z])', 'Šira mora imati malo slovo')
    .matches('^(?=.*[A-Z])', 'Šifra mora imati veliko slovo')
    .matches('^(?=.*[0-9])', 'Šifra mora imati broj')
    .matches(
      '^(?=.*[@$!%*#?&])',
      'Šifra mora imati specijalni karakter (@$!%*#?&)'
    )
    .min(
      8,
      ({ min, value }) =>
        `Šifa mora imati minimum 8 znakova, imate još ${
          min - value.length
        } znakova`
    )
    .max(
      16,
      ({ max, value }) =>
        `Šifra može imati najviše 16 znakova, imate ${
          value.length - max
        } znakova više`
    )
    .required('Šifra je obavezna'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Šifre se ne podudaraju')
    .required('Morate potvrditi šifru'),
});

function Register() {
  const classes = useStyles();

  const onSubmit = (values, onSubmitProps) => {
    // console.log(values, onSubmitProps);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };
  return (
    <Grid style={{ height: '80vh' }}>
      <Paper elevation={10} className={classes.paperRoot}>
        <Grid align='center'>
          <FormAvatar icon='lock' className={classes.formAvatar} />

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
                  color='primary'
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