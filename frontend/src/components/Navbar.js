import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
  tabsContainer: {
    marginLeft: 'auto',
  },
  tab: {
    fontWeight: 'bold',
    minWidth: 10,
    marginLeft: '25px',
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (window.location.pathname === '/' && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === '/aboutus' && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === '/login' && value !== 2) {
      setValue(2);
    } else if (window.location.pathname === '/register' && value !== 3) {
      setValue(3);
    } else if (window.location.pathname === '/dashboard' && value !== 4) {
      setValue(4);
    }
  }, [value]);

  const handleChange = (e, value) => {
    setValue(value);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6">Logo</Typography>
          <Tabs
            className={classes.tabsContainer}
            value={value}
            onChange={handleChange}
          >
            <Tab
              className={classes.tab}
              label="Događaji"
              component={Link}
              to="/"
            />
            <Tab
              className={classes.tab}
              label="O nama"
              component={Link}
              to="/aboutus"
            />
            <Tab
              className={classes.tab}
              label="Login"
              component={Link}
              to="/login"
            />
            <Tab
              className={classes.tab}
              label="Registracija"
              component={Link}
              to="/register"
            />
            <Tab className={classes.tab} label="Profil" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
}
