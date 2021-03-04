import React, { useState } from 'react';
import { AuthProvider } from '../context/AuthContext';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import HomePage from '../pages/HomePage';
import AboutUs from '../pages/AboutUs';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Navbar from './Navbar';
import User from './user/UserEvent';
import Logout from './Logout';

export default function App() {
  const [auth, setAuth] = useState(
    localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {}
  );
  console.log(auth);

  return (
    <div>
      <AuthProvider value={auth}>
        <Router history={history}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/aboutus" component={AboutUs} />
            <Route path="/register" component={RegisterPage} />
            <Route
              path="/login"
              render={() => <LoginPage setAuth={setAuth} />}
            />
            <Route path="/dashboard" component={User} />
            <Route path="/logout" render={() => <Logout setAuth={setAuth} />} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}
