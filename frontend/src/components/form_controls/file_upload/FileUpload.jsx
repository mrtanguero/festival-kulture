import React from 'react';
import { useField, useFormikContext } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Image } from '@material-ui/icons';
import { Button, TextField, InputAdornment } from '@material-ui/core';

const useStyles = makeStyles({
  fileBtnRoot: {
    display: 'flex',
    justifyContent: 'space-beetween',
    border: '1px solid #bdbdbd',
    borderRadius: '4px',
    height: '3.2em',

    '& input': {
      display: 'none',
    },

    '& span': {
      border: 'none',
      color: '#757575',
    },
  },
});

function FileUpload(props) {
  const { name, label, onChange, value, ...rest } = props;
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const classes = useStyles();

  const handleChange = (event) => {
    const value = event.tartet.files[0];
    const fieldName = name;
    setFieldValue(fieldName, value);
  };

  const fileConfig = {
    name: name,
    label,
    id: name,
    type: 'file',
    variant: 'outlined',
    ...field,
    ...rest,
  };

  if (meta && meta.touched && meta.error) {
    fileConfig.error = true;
    fileConfig.helperText = meta.error;
  }

  return (
    <TextField
      {...fileConfig}
      fullWidth
      onChange={(e) => handleChange(e)}
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
