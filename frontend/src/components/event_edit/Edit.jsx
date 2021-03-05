import React from 'react';
import { Grid, Button } from '@material-ui/core';
import Input from '../../components/form_controls/input/Input';
import { useStyles } from '../user/user_style';

const inputSwitch = (inp, inpIcon, inpLabel, inpName) => {
  switch (inp) {
    case 'text':
      return <Input icon={inpIcon} label={inpLabel} name={inpName} />;
    default:
      return null;
  }
};

const eventSwitch = (child, props) => {
  switch (child) {
    case 'img':
      return <img {...props} />;
    default:
      return null;
  }
};

function Edit(props) {
  const classes = useStyles();
  const {
    type,
    child,
    icon,
    label,
    name,
    childProps,
    handleClick,
    eventClass,
    setDisplay,
    btnClass,
  } = props;
  return (
    <Grid item xs={12}>
      <div className={eventClass}>{eventSwitch(child, childProps)}</div>

      {setDisplay ? (
        <Grid item xs={12}>
          <div className={{ display: setDisplay }}>
            {inputSwitch(type, icon, label, name)}
          </div>
        </Grid>
      ) : null}

      <Button
        type='button'
        variant='contained'
        className={btnClass}
        onClick={() => handleClick(setDisplay)}
      >
        Edit
      </Button>
    </Grid>
  );
}

export default Edit;
