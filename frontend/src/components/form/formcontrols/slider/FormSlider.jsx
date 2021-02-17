import { Button } from '@material-ui/core';
import React from 'react';
import { useStyles } from '../../form-style';

function FormSlider(props) {
  const { onClick } = props;
  const classes = useStyles();
  return (
    <div div className={classes.sliderContainer}>
      <div className={`${classes.slider} ${classes.slideLeft}`}>
        <div className={classes.sliderContent}>
          <h3>Nemaš nalog ?</h3>
          <p>Otvori nalog i kreiraj svoj događaj!</p>
          <Button
            component='button'
            variant='contained'
            color='default'
            onClick={() => onClick(classes.formMode)}
          >
            Sign up
          </Button>
        </div>
        <img
          src='./assets//code_thinking.svg'
          className={classes.sliderImg}
          alt=''
        />
      </div>
      <div className={`${classes.slider} ${classes.slideRight}`}>
        <div className={classes.sliderContent}>
          <h3>Imaš nalog ?</h3>
          <p>Uloguj se i kreiraj svoj događaj.</p>
          <Button
            component='button'
            variant='contained'
            color='default'
            onClick={() => onClick('')}
          >
            Sign in
          </Button>
        </div>
        <img
          src='./assets//mobile_app.svg'
          className={classes.sliderImg}
          alt=''
        />
      </div>
    </div>
  );
}

export default FormSlider;
