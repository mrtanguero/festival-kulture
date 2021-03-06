import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import Edit from './Edit';
import SubmitBtn from '../../components/form_controls/submit_button/SubmitBtn';
import { Button, Grid, Paper } from '@material-ui/core';
import { useStyles } from './event_edit-style';

const EVENT_DAY = {
  1: 'Petak',
  2: 'Subota',
  3: 'Nedelja',
};

const EVENT_TYPE = {
  movie: 'Muzički',
  teather: 'Filmski',
  galery: 'Likovni',
  dance: 'Plesni',
  cooking: 'Kulinarski',
};

const INITIAL_VALUES = {
  eventTitle: 'Prcko',
  eventTime: '23:30',
  eventDay: '1',
  eventType: 'Filmski',
  eventImg: '/images/eiffel.png',
  eventDescription: 'Nesto masno',
};

const EDIT_VALIDATION = yup.object().shape({
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
  eventTime: yup
    .string()

    .required('Odaberite vrijeme događaja'),
  eventDay: yup.string().required('Odaberite dan događaja'),
  eventType: yup.string().required('Odaberite žanr događaja'),
  eventImg: yup.string().required('URL adresa fotografije obavezna'),
  eventDescription: yup
    .string()
    .min(10, ({ min, value }) => `Imate još ${min - value.length}`)
    .required('Unesite opis događaja'),
});

function EditEvent(props) {
  const classes = useStyles();
  const [active, setActive] = useState(false);

  const handleSubmit = (values, onSubmitProps) => {
    console.log(values);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  const handleActive = (value) => {
    setActive(!value);
  };

  return (
    <Paper className={classes.editRoot}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={EDIT_VALIDATION}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <Grid container className={classes.eventContainer}>
                <Edit
                  eventClass={classes.eventImg}
                  btnClass={classes.editBtn}
                  setDisplay={active}
                  type='text'
                  name='eventImg'
                  label='Promijeni URL'
                  icon='image'
                  handleClick={handleActive}
                  child='img'
                  childProps={{
                    className: classes.eventImg,
                    src: '/images/eiffel.png',
                    alt: 'Fotografija događaja',
                  }}
                />
              </Grid>

              <Grid item xs={12} align='center'>
                <SubmitBtn children='potvrdi promjene' />
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Paper>
  );
}

export default EditEvent;
