import React, { useContext } from 'react';
import history from '../history';
import djangoAPI from '../api/djangoAPI';
import AuthContext from '../context/AuthContext';

export default function Logout({ setAuth }) {
  const auth = useContext(AuthContext);
  console.log(auth.token);

  const logout = async () => {
    const results = await djangoAPI.post(
      '/logout/',
      {},
      {
        headers: {
          Authorization: `Token ${auth.token}`,
        },
      }
    );
    console.log(results);
    if (!results.data) {
      localStorage.clear();
      setAuth({});
      setTimeout(() => {
        history.push('/');
      }, 3000);
    }
  };
  if (auth.token) {
    logout();
  }
  return <div>Uspješno ste izlogovani. Redirecting...</div>;
}
