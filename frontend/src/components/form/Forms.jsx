import React, { useState } from 'react';
import Login from './login/Login';
import Register from './register/Register';
import GoogleLogin from './google_login/GoogleLogin';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useStyles } from './form-style';
import FormSlider from './formcontrols/slider/FormSlider';

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
  const [formMode, setFormMode] = useState('');
  const classes = useStyles();

  const handleClick = (value) => {
    setFormMode(value);
  };
  return (
    <Formik
      initialValues={{
        ...INITIAL_VAlUES,
      }}
      validationSchema={FORM_VALIDATION}
    >
      <div className={`${classes.formRoot} ${formMode}`}>
        <div className={classes.formsContainer}>
          <div className={classes.loginRegister}>
            <Login />
            <Register />
          </div>
        </div>
        <FormSlider onClick={handleClick} />
      </div>
    </Formik>
  );
}

export default Forms;
