import React from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { useStyles } from './user_style';
import { Grid, Paper } from '@material-ui/core';
import Input from '../form_controls/input/Input';
import FormTitle from '../form_controls/form_title/FormTitle';
import SubmitBtn from '../form_controls/submit_button/SubmitBtn';

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  phone: '',
  profileImg: '',
};

const USER_VALIDATION = yup.object({
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
  phone: yup
    .number()
    .integer('Broj telefona moraju biti samo cifre')
    .typeError('Unesite validan broj telefona')
    .required('Morate unijeti broj telefona'),
  profileImg: yup.mixed().required('Slika je obavezna'),
});

function User(props) {
  const classes = useStyles();
  const handleSubmit = (values, onSubmitProps) => {
    let data = new FormData();
    data.append('profileImg', values.profileImg);
    // return fetch(baseUrl, { method: 'post', headers: new Headers(// {Accept: 'application/json'}), body: data})
    // console.log(values, onSubmitProps);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  return (
    <Grid container spacing={2} className={classes.userRoot}>
      <Paper className={classes.paperRoot}>
        <FormTitle>Unesite svoje podatke</FormTitle>

        <Grid item xs={12}>
          <Formik
            initialValues={{ ...INITIAL_VALUES }}
            validationSchema={USER_VALIDATION}
            onSubmit={handleSubmit}
          >
            {(formik) => {
              console.log(formik);
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Input
                        type='text'
                        label='Ime'
                        name='firstName'
                        icon='user'
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Input
                        type='text'
                        label='Prezime'
                        name='lastName'
                        icon='user'
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Input
                        type='phone'
                        label='Broj telefona'
                        name='phone'
                        icon='phone'
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FileUpload label='Slika profila' name='profileImg' />
                    </Grid>
                    <Grid item xs={12} align='center'>
                      <SubmitBtn children='potvrdi' />
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default User;
