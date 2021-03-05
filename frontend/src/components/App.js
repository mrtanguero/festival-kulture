import React, { useState } from 'react';
import { AuthProvider } from '../context/AuthContext';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import HomePage from '../pages/HomePage';
import AboutUs from '../pages/AboutUs';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Navbar from './Navbar';
// import User from './user/UserEvent';
import Logout from './Logout';
// import UserEvent from './user/UserEvent';
// import EditEvent from '../components/event_edit/EditEvent';

export default function App() {
  const [auth, setAuth] = useState(
    localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {}
  );
  const [value, setValue] = useState(0);

  return (
    <div>
      <AuthProvider value={auth}>
        <Router history={history}>
          <Navbar value={value} setValue={setValue} />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/aboutus" component={AboutUs} />
            <Route path="/register" component={RegisterPage} />
            <Route
              path="/login"
              render={() => <LoginPage setValue={setValue} setAuth={setAuth} />}
            />
            <Route
              path="/dashboard"
              render={() => <div>Ovo je user profile page</div>}
            />
            <Route
              path="/logout"
              render={() => <Logout setValue={setValue} setAuth={setAuth} />}
            />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}
