import React from 'react';
import * as yup from 'yup';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { useStyles } from './user_style';
import { Grid, Paper, InputAdornment, TextField } from '@material-ui/core';
import { Image } from '@material-ui/icons';
import Input from '../form_controls/input/Input';
import Select from '../form_controls/select/Select';
import Textarea from '../form_controls/textarea/Textarea';
import FormTitle from '../form_controls/form_title/FormTitle';
import FileUpload from '../form_controls/file_upload/FileUpload';
import SubmitBtn from '../form_controls/submit_button/SubmitBtn';

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

const EVENT_TYPE = {
  movie: 'Film',
  teather: 'Pozorište',
  galery: 'Slikarstvo',
};

const INITIAL_VALUES = {
  eventTitle: '',
  eventTime: '',
  eventDay: '',
  eventType: '',
  eventImg: '',
  // file: undefined,
  eventDescription: '',
};

const EVENT_VALIDATION = yup.object({
  eventTitle: yup
    .string()
    .max(
      30,
      ({ max, value }) =>
        `Možete unijeti najviše ${max} znakova, unijeli ste ${
          value.length - max
        } preko`
    )
    .required('Morate imati naslov događaja'),
  eventTime: yup.string().required('Odaberite vrijeme događaja'),
  eventDay: yup.string().required('Odaberite dan događaja'),
  eventType: yup.string().required('Odaberite žanr događaja'),
  eventImg: yup.mixed().required('Slika događaja je obavezna'),
  // .test('fileSize', 'Slika prelazi dozvoljenu veličinu', (value) => {
  //   return value && value[0].size <= 100000;
  // })
  // .test('type', 'Slika može biti u .jpg formatu', (value) => {
  //   return value && value[0].type === 'eventImg/jpg';
  // }),
  eventDescription: yup
    .string()
    .min(1, ({ min, value }) => `Imate još ${min - value.length}`)
    .required('Unesite opis događaja'),
});

function UserEvent(props) {
  const classes = useStyles();

  const handleSubmit = (values, onSubmitProps) => {
    console.log(values);
    // let data = new FormData();
    // data.append('profileImg', values.profileImg);
    // return fetch(baseUrl, { method: 'post', headers: new Headers(// {Accept: 'application/json'}), body: data})
    // console.log(values, onSubmitProps);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };
  return (
    <Grid container spacing={2} className={classes.userRoot}>
      <Paper>
        <FormTitle>Unesite detalje događaja</FormTitle>

        <Grid item xs={12}>
          <Formik
            initialValues={{ ...INITIAL_VALUES }}
            validationSchema={EVENT_VALIDATION}
            onSubmit={handleSubmit}
          >
            {(formik) => {
              // const handleChange = (event) => {
              //   const valueName = event.target.files[0];
              //   console.log(event.currentTarget.files);
              //   formik.setFieldValue('eventImg', valueName);
              //   formik.setFieldValue('file', event.target.files[0]);
              // };
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Input
                        type='text'
                        label='Naslov događaja'
                        name='eventTitle'
                        icon='book'
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Select
                        label='Odaberite vrijeme događаја'
                        name='eventTime'
                        options={EVENT_TIME}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Select
                        label='Odaberite dan događаја'
                        name='eventDay'
                        options={EVENT_DAY}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Select
                        label='Odaberite žanr događaja'
                        name='eventType'
                        options={EVENT_TYPE}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      {/* <Field
                        as={TextField}
                        name='eventImg'
                        id='eventImg'
                        type='file'
                        variant='outlined'
                        onChange={(event) => {
                          return formik.setFieldValue(
                            'eventImg',
                            event.target.files[0]
                          );
                        }}
                        label='Slika'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <Image />
                            </InputAdornment>
                          ),
                        }}
                        error={
                          formik.touched.eventImg &&
                          Boolean(formik.errors.eventImg)
                        }
                        helperText={
                          formik.touched.eventImg ? formik.errors.eventImg : ''
                        }
                      /> */}

                      <FileUpload
                        name='eventImg'
                        label='Slika događaja'
                        // onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Textarea
                        type='textarea'
                        label='Opišite događaj'
                        name='eventDescription'
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} align='center'>
                    <SubmitBtn children='potvrdi' />
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

export default UserEvent;
