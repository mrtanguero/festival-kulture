import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GoogleLogin from 'react-google-login';
const googleClientID =
  '83238091984-pa9q29a4gjag1iumdn1ggkfapgriam6t.apps.googleusercontent.com';

const GoogleeLogin = () => {
  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profile);
  };
  return (
    <GoogleLogin
      clientId={googleClientID}
      buttonText='Prijavi se pomoću Google naloga'
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cokiePolicy={'single_host_policy'}
    />
  );
};

export default GoogleeLogin;
