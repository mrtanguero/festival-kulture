import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GoogleLogin from 'react-google-login';

const useStyles = makeStyles((theme) => ({
  googleLogin: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    '& button': {
      marginLeft: '10px',
      boxShadow: 'none !important',

      '& div': {
        margin: '0 !important',
      },
    },

    '& span': {
      display: 'none',
    },
  },
}));

const googleClientID =
  '83238091984-pa9q29a4gjag1iumdn1ggkfapgriam6t.apps.googleusercontent.com';

function GoogleeLogin() {
  const history = useHistory();
  const classes = useStyles();
  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profile);
  };
  return (
    <Typography className={classes.googleLogin}>
      Ili se prijavi pomoću Google naloga{' '}
      <GoogleLogin
        clientId={googleClientID}
        buttonText=''
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cokiePolicy={'single_host_policy'}
      />
    </Typography>
  );
}

export default GoogleeLogin;
