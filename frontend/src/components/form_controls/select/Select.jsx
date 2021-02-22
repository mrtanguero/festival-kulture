import React from 'react';
import { Field, ErrorMessage } from 'formik';

function Select(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field as='select' id={name} name={name} {...rest}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
    </div>
  );
}

export default Select;

{
  /* <FormikControl
  control='select'
  label='Select'
  name='select'
  options={dropdownOptions}
/>;

const dropdownOptions = [
  { key: 'Select an option', value: '' },
  { key: 'Option 1', value: 'Option 1' },
  { key: 'Option 2', value: 'Option 2' },
  { key: 'Option 3', value: 'Option 3' },
]; */
}
