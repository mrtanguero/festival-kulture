import React, { useHistory } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
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

function Login(props) {
  console.log(props);
  const classes = useStyles();

  const onSubmit = (values, onSubmitProps) => {
    // console.log(values, onSubmitProps);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
    // Home page after valid login
  };

  return (
    <Grid>
      <Paper elevation={10} className={classes.paperRoot}>
        <Grid align='center'>
          <FormAvatar icon='lock' className={classes.formAvatar} />

          <Typography variant='h4' component='h2' className={classes.formTitle}>
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
                  type='text'
                  label='Korisničko ime'
                  name='username'
                  icon='user'
                />

                <Input
                  type='password'
                  label='Šifra'
                  name='password'
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
          Nemaš nalog <Link to='/register'>Registruj se</Link>
        </Typography>

        {/* Remove comment tags for Google Login */}
        {/* <GoogleeLogin /> */}
      </Paper>
    </Grid>
  );
}

export default Login;
