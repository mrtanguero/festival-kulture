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
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  console.log(classes);

  const handleChange = (_, value) => {
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
            <Tab className={classes.tab} label="Home" component={Link} to="/" />
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
