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
  password: '',
};

const LOGIN_VALIDATION = yup.object({
  username: yup
    .string()
    .max(
      16,
      ({ max, value }) =>
        `Imate još ${max - value.length} karaktera na raspolaganju`
    )
    .required('Korisničko ime je obavezno'),
  password: yup.string().required('Morate unijeti šifru'),
});

function LoginPage({ setAuth, setValue }) {
  const classes = useStyles();

  const onSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
    const response = await djangoAPI.post('/login/', {
      username: values.username,
      password: values.password,
    });

    if (response.statusText === 'OK') {
      setAuth(response.data);
      localStorage.setItem('auth', JSON.stringify(response.data));
      setValue(0);
      history.push('/');
    } else {
      console.error(response.statusText);
    }
  };

  return (
    <Grid>
      <Paper elevation={10} className={classes.paperRoot}>
        <Grid align="center">
          <FormAvatar icon="lock" className={classes.formAvatar} />

          <Typography variant="h4" component="h2" className={classes.formTitle}>
            PRIJAVI SE
          </Typography>
        </Grid>

        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={LOGIN_VALIDATION}
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
                />

                <Input
                  type="password"
                  label="Šifra"
                  name="password"
                  icon="lock"
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
          Nemaš nalog{' '}
          <Link to="/register" onClick={() => setValue(3)}>
            Registruj se
          </Link>
        </Typography>

        {/* <GoogleeLogin /> */}
      </Paper>
    </Grid>
  );
}

export default LoginPage;
