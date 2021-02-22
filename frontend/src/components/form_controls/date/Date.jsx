import React from 'react';
import { Field, ErrorMessage } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import DateView from 'react-datepicker';

function Date(props) {
  const { label, name, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={(value) => setFieldValue(name, value)}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
}

export default Date;

{
  /* <FormikControl control='date' label='Pick Date' name='somedate' />; */
}
