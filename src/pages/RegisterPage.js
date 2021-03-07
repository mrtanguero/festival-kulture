import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import djangoAPI from '../api/djangoAPI';
import history from '../utils/history';

import { useStyles } from './login_register-style';
import { Button, Typography, Grid, Paper } from '@material-ui/core';
import Input from '../components/form_controls/input/Input';
// import GoogleeLogin from '../components/google_login/GoogleLogin';
import FormAvatar from '../components/form_controls/avatar/FormAvatar';

const INITIAL_VALUES = {
  username: '',
  firstName: '',
  lastName: '',
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
  firstName: yup
    .string()
    .min(3, ({ min }) => `Ime mora sadržati barem ${min} slova`)
    .max(
      15,
      ({ max, value }) =>
        `Ime ne može prelaziti ${max} znakova, unijeli ste ${
          value.length - max
        } više`
    )
    .required('Unesite ime'),
  lastName: yup
    .string()
    .max(
      30,
      ({ max, value }) =>
        `Prezime ne može imati preko ${max} znakova, unijeli ste ${
          value.length - max
        } više`
    )
    .required('Unesite prezime'),
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

function RegisterPage({ setValue }) {
  const classes = useStyles();

  const onSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
    try {
      const response = await djangoAPI.post('/createModerator/', {
        username: values.username,
        password: values.password,
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
      });
      if (response.status === 201) {
        setValue(0);
        history.push('/');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Grid>
      <Paper elevation={10} className={classes.paperRoot}>
        <Grid align="center">
          <FormAvatar icon="circle" className={classes.formAvatar} />

          <Typography variant="h4" component="h2" className={classes.formTitle}>
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
                  type="text"
                  label="Korisničko ime"
                  name="username"
                  icon="user"
                  placeholder="kimosabe13"
                />

                <Input
                  type="text"
                  label="Ime"
                  name="firstName"
                  icon="face"
                  placeholder="Ljubiša"
                />

                <Input
                  type="text"
                  label="Prezime"
                  name="lastName"
                  icon="face"
                  placeholder="Doe"
                />

                <Input
                  type="email"
                  label="Email"
                  name="email"
                  icon="email"
                  placeholder="test@mail.com"
                />

                <Input
                  type="password"
                  label="Šifra"
                  name="password"
                  icon="lock"
                />

                <Input
                  type="password"
                  label="Potvrdite šifru"
                  name="confirmPassword"
                  icon="verify"
                />

                <Button
                  type="submit"
                  disabled={!formik.isValid}
                  component="button"
                  variant="contained"
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
          Imaš nalog{' '}
          <Link to="/login" onClick={() => setValue(2)}>
            Prijavi se
          </Link>
        </Typography>

        {/* <GoogleeLogin /> */}
      </Paper>
    </Grid>
  );
}

export default RegisterPage;
