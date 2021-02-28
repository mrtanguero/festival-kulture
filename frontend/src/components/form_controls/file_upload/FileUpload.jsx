import React, { useEffect } from 'react';
import { useField, useFormikContext } from 'formik';
import { Image } from '@material-ui/icons';
import { TextField, InputAdornment } from '@material-ui/core';

function FileUpload(props) {
  const { name, label, ...rest } = props;
  const [field, meta] = useField(name);
  const { values, setFieldValue } = useFormikContext();

  const handleChange = (event) => {
    setFieldValue(name, event.target.files[0]);
    console.log(values);

    //   const { files } = event.target;
    //   setFieldValue(name, files[0]);
  };

  const fileConfig = {
    ...field,
    ...rest,
    name,
    label,
    type: 'file',
    variant: 'outlined',
    onChange: handleChange,
    fullWidth: true,
  };

  if (meta && meta.touched && meta.error) {
    fileConfig.error = true;
    fileConfig.helperText = meta.error;
  }

  return (
    <TextField
      {...fileConfig}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Image />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default FileUpload;
