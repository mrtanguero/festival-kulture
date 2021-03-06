import React, { useContext } from 'react';
import history from '../../utils/history';
import AuthContext from '../../context/AuthContext';
import djangoAPI from '../../api/djangoAPI';

import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { useStyles } from './user_style';
import { Grid, Paper } from '@material-ui/core';
import Input from '../form_controls/input/Input';
import Select from '../form_controls/select/Select';
import Textarea from '../form_controls/textarea/Textarea';
import FormTitle from '../form_controls/form_title/FormTitle';
import SubmitBtn from '../form_controls/submit_button/SubmitBtn';

const EVENT_STAGE = {
  1: 'Stage broj 1',
  2: 'Stage broj 2',
};

const EVENT_DAY = {
  1: 'Petak',
  2: 'Subota',
  3: 'Nedelja',
};

const EVENT_TYPE = {
  muzika: 'muzika',
  film: 'film',
  izložba: 'izložba',
  ples: 'ples',
  poezija: 'poezija',
};

const INITIAL_VALUES = {
  eventTitle: '',
  eventStage: '',
  eventStartTime: '20:00',
  eventEndTime: '21:00',
  eventDay: '',
  eventType: '',
  eventImg: '',
  eventDescription: '',
};

const EVENT_VALIDATION = yup.object().shape({
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
  eventStartTime: yup.string().required('Odaberite vrijeme početka događaja'),
  eventEndTime: yup.string().required('Odaberite vrijeme kraja događaja'),
  eventDay: yup.string().required('Odaberite dan događaja'),
  eventStage: yup.string().required('Odaberite lokaciju događaja'),
  eventType: yup.string().required('Odaberite žanr događaja'),
  eventImg: yup.string().required('URL adresa fotografije obavezna'),
  eventDescription: yup
    .string()
    .min(10, ({ min, value }) => `Imate još ${min - value.length}`)
    .required('Unesite opis događaja'),
});

function UserEvent(props) {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  const handleSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();

    const response = await djangoAPI.post(
      '/createEvent/',
      {
        event_name: values.eventTitle,
        host: auth.user.id,
        stage: values.eventStage,
        category: values.eventType,
        day: values.eventDay,
        start_time: values.eventStartTime,
        end_time: values.eventEndTime,
        description: values.eventDescription,
        event_img: values.eventImg,
      },
      {
        headers: {
          Authorization: `Token ${auth.token}`,
        },
      }
    );
    if (response.status === 201) {
      history.push('/');
    }

    // let data = new FormData();
    // data.append('profileImg', values.profileImg);
    // return fetch(baseUrl, { method: 'post', headers: new Headers(// {Accept: 'application/json'}), body: data})
    // console.log(values, onSubmitProps);
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
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Input
                        type="text"
                        label="Naslov događaja"
                        name="eventTitle"
                        icon="book"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Select
                        label="Odaberite lokaciju događаја"
                        name="eventStage"
                        options={EVENT_STAGE}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Input
                        type="time"
                        name="eventStartTime"
                        label="Vrijeme početka događaja"
                        icon="time"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Input
                        type="time"
                        name="eventEndTime"
                        label="Vrijeme završetka događaja"
                        icon="time"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Select
                        label="Odaberite dan događаја"
                        name="eventDay"
                        options={EVENT_DAY}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Select
                        label="Odaberite žanr događaja"
                        name="eventType"
                        options={EVENT_TYPE}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Input
                        type="text"
                        label="URL fotografije"
                        name="eventImg"
                        icon="image"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Textarea
                        type="textarea"
                        label="Opišite događaj"
                        name="eventDescription"
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} align="center">
                    <SubmitBtn children="potvrdi" />
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
