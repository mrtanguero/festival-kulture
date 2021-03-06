import React, { useContext } from 'react';
import history from '../utils/history';
import djangoAPI from '../api/djangoAPI';
import AuthContext from '../context/AuthContext';

export default function Logout({ setAuth, setValue }) {
  const auth = useContext(AuthContext);

  const logout = async () => {
    const response = await djangoAPI.post(
      '/logout/',
      {},
      {
        headers: {
          Authorization: `Token ${auth.token}`,
        },
      }
    );
    if (response.status === 204) {
      localStorage.clear();
      setAuth({});
      setValue(0);
      history.push('/');
    }
  };
  if (auth.token) {
    logout();
  }
  return <div>Uspješno ste izlogovani. Redirecting...</div>;
}
