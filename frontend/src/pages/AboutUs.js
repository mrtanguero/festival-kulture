import React from 'react';
import usersAPI from '../api/usersAPI';

export default function AboutUs() {
  const apiCall = async () => {
    const data = await usersAPI.get('/showUsers');
    console.log(data);
  };

  apiCall();

  return <div>About Us</div>;
}
