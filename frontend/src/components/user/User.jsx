import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Grid, makeStyles, Paper, Typography, Button } from '@material-ui/core';
import Input from '../form_controls/input/Input';
import Select from '../form_controls/select/Select';
import Textarea from '../form_controls/textarea/Textarea';

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  eventTime: '',
  eventDay: '',
  // phone: '',
  profileImg: '',
};

const MAX_IMG_SIZE = 1100000;

const USER_VALIDATION = yup.object({
  firstName: yup
    .string()
    .min(3, 'Ime ne može imati manje od 3 znaka')
    .max(15, 'Ime ne može imati preko 15 znakova')
    .required('Morate unijeti ime'),
  lastName: yup
    .string()
    .max(30, 'Prezime ne može imati preko 30 znakova')
    .required('Morate unijeti prezime'),
  eventTime: yup.string().required('Morate odabrati vrijeme događaja'),
  eventDay: yup.string().required('Morate odabrati dan događaja'),
  // phone: yup
  //   .number()
  //   .integer('Broj telefona moraju biti samo cifre')
  //   .typeError('Unesite validan broj telefona')
  //   .required('Morate unijeti broj telefona'),
  profileImg: yup
    .mixed()
    // .test(
    //   'profileImg',
    //   'Slika je prvelika, mora biti manja od 1 Mb',
    //   (file) => {
    //     if (file) {
    //       console.log(file.size);
    //       return file.size <= 1024;
    //     } else {
    //       return true;
    //     }
    //   }
    // )
    .required('Morate unijeti sliku'),
});

const EVENT_TIME = {
  hour_23: '23h',
  hour_24: '00h',
  hour_01: '01h',
};

const EVENT_DAY = {
  friday: 'Petak',
  saturday: 'Subota',
  sunday: 'Nedelja',
};

const useStyles = makeStyles((theme) => ({
  userRoot: {
    width: '80%',
    margin: 'auto',

    '& .MuiPaper-root': {
      width: '100%',
      margin: '5% 1%',
      '& div': {
        padding: '1%',
      },
    },
  },
}));

function User(props) {
  const classes = useStyles();
  const handleSubmit = (values, onSubmitProps) => {
    console.log(values);
    let data = new FormData();
    data.append('profileImg', values.profileImg);
    console.log(data);
    // return fetch(baseUrl, { method: 'post', headers: new Headers(// {Accept: 'application/json'}), body: data})
    // console.log(values, onSubmitProps);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  return (
    <Grid container spacing={2} className={classes.userRoot}>
      <Paper>
        <Grid item xs={12}>
          <Typography variant='h3' component='h2' align='center'>
            Unesite svoje podatke
          </Typography>
        </Grid>

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
                    <Grid item xs={12} md={6}>
                      <Input
                        type='text'
                        label='Ime'
                        name='firstName'
                        icon='user'
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Input
                        type='text'
                        label='Prezime'
                        name='lastName'
                        icon='user'
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Select
                        label='Odaberi vrijeme događаја'
                        name='eventTime'
                        options={EVENT_TIME}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Select
                        label='Odaberi dan događаја'
                        name='eventDay'
                        options={EVENT_DAY}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Input
                        type='file'
                        label='Ubaci sliku'
                        name='profileImg'
                        icon='image'
                        onChange={(e) => {
                          formik.setFieldValue('profileImg', e.target.files[0]);
                        }}
                        accept='.jpg, .jpeg, .png'
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Textarea label='Opiši event' name='eventDescription' />
                  </Grid>

                  <Grid item xs={4}>
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
