import React, { Fragment } from 'react';
import { Field, ErrorMessage } from 'formik';

function RadioButton(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <Fragment key={option.key}>
                <input
                  type='radio'
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                />

                <label htmlFor={option.value}>{option.key}</label>
              </Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
}

export default RadioButton;

// const radioOptions = [
//   { key: 'Option 1', value: 'Ini' },
//   { key: 'Option 2', value: 'Isi' },
// ];

// <FormikControl
//   control='radio'
//   label='RadioButton'
//   name='radio'
//   options={radioOptions}
// />;
