import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useStyles } from './login_register-style';
import { Button, Typography, Grid, Paper } from '@material-ui/core';
import FormikControl from '../components/form_controls/FormikControl';
import GoogleeLogin from '../components/google_login/GoogleLogin';
import FormAvatar from '../components/form_controls/avatar/FormAvatar';

const INITIAL_VALUES = {
  username: '',
  password: '',
};

const LOGIN_VALIDATION = yup.object({
  username: yup.string().required('Korisničko ime je obavezno'),
  password: yup.string().required('Morate unijeti šifru'),
});

function Login(props) {
  const classes = useStyles();

  const onSubmit = (values, onSubmitProps) => {
    // console.log(values, onSubmitProps);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  return (
    <Grid style={{ height: '70vh' }}>
      <Paper elevation={10} className={classes.paperRoot}>
        <Grid align='center'>
          <FormAvatar icon='lock' className={classes.formAvatar} />

          <Typography variant='h4' component='h2' className={classes.formTitle}>
            REGISTRUJ SE
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
                <FormikControl
                  control='input'
                  type='text'
                  label='Korisničko ime'
                  name='username'
                  icon='user'
                />

                <FormikControl
                  control='input'
                  type='password'
                  label='Šifra'
                  name='password'
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
          Nemaš nalog <Link to='/register'>Registruj se</Link>
        </Typography>

        <GoogleeLogin />
      </Paper>
    </Grid>
  );
}

export default Login;
