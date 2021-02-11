import React from 'react';
import Login from './login/Login';
import Register from './register/Register';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

const INITIAL_VAlUES = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const FORM_VALIDATION = yup.object().shape({
  username: yup.string().required('Ovo polje je obavezno'),
  email: yup
    .string()
    .email('Email mora biti validan')
    .required('Ovo polje je obavezno'),
  password: yup
    .string()
    .min(8, 'Šifra mora imati barem 8 karaktera')
    .max(16, 'Šifra ne može imati preko 16 karaktera')
    .required('Ovo polje je obavezno'),
  confirmPassword: yup
    .string()
    .required('Ovo polje je obavezno')
    .oneOf([yup.ref('password')], 'Šifre se moraju podudarati'),
});

function Forms(props) {
  return (
    <Formik
      initialValues={{
        ...INITIAL_VAlUES,
      }}
      validationSchema={FORM_VALIDATION}
    >
      <Form>
        <Login />
      </Form>
    </Formik>
  );
}

export default Forms;
