import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  tabsContainer: {
    marginLeft: 'auto',
  },
  tab: {
    fontWeight: 'bold',
    minWidth: 10,
    marginLeft: '25px',
  },
  drawerIconContainer: {
    marginLeft: 'auto',
  },
  drawerIcon: {
    height: '30px',
    width: '30px',
    color: 'white',
  },
  drawer: {
    backgroundColor: '#ec2957',
    color: 'white',
  },
  drawerItem: {
    opacity: 0.7,
  },
  drawerItemSelected: {
    opacity: 1,
  },
}));

export default function Navbar({ value, setValue }) {
  const theme = useTheme();
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  // const [value, setValue] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (window.location.pathname === '/' && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === '/aboutus' && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === '/login' && value !== 2) {
      setValue(2);
    } else if (window.location.pathname === '/register' && value !== 3) {
      setValue(3);
    } else if (window.location.pathname === '/dashboard' && value !== 2) {
      setValue(3);
    } else if (window.location.pathname === '/logout' && value !== 3) {
      setValue(3);
    }
  });

  const handleChange = (e, value) => {
    setValue(value);
  };

  const notLoggedInTabs = !auth.token
    ? [
        <Tab
          key={2}
          className={classes.tab}
          label="Login"
          component={Link}
          to="/login"
        />,
        <Tab
          key={3}
          className={classes.tab}
          label="Registracija"
          component={Link}
          to="/register"
        />,
      ]
    : null;

  const loggedInTabs = auth.token
    ? [
        <Tab
          key={2}
          className={classes.tab}
          label="Profil"
          component={Link}
          to="/dashboard"
        />,
        <Tab
          key={3}
          className={classes.tab}
          label="Logout"
          component={Link}
          to="/logout"
        />,
      ]
    : null;

  const tabs = (
    <Tabs
      className={classes.tabsContainer}
      value={value}
      onChange={handleChange}
    >
      <Tab
        key={0}
        className={classes.tab}
        label="Događaji"
        component={Link}
        to="/"
      />
      <Tab
        key={1}
        className={classes.tab}
        label="O nama"
        component={Link}
        to="/aboutus"
      />

      {notLoggedInTabs}

      {loggedInTabs}
    </Tabs>
  );

  const notLoggedInDrawerItems = !auth.token
    ? [
        <ListItem
          key={2}
          className={
            value === 2 ? classes.drawerItemSelected : classes.drawerItem
          }
          divider
          button
          onClick={() => {
            setValue(2);
            setOpenDrawer(false);
          }}
          component={Link}
          to="/login"
          selected={value === 2}
        >
          <ListItemText>Login</ListItemText>
        </ListItem>,
        <ListItem
          key={3}
          className={
            value === 3 ? classes.drawerItemSelected : classes.drawerItem
          }
          divider
          button
          onClick={() => {
            setValue(3);
            setOpenDrawer(false);
          }}
          component={Link}
          to="/register"
          selected={value === 3}
        >
          <ListItemText>Registracija</ListItemText>
        </ListItem>,
      ]
    : null;

  const loggedInDrawerItems = auth.token
    ? [
        <ListItem
          key={2}
          className={
            value === 2 ? classes.drawerItemSelected : classes.drawerItem
          }
          divider
          button
          onClick={() => setOpenDrawer(false)}
          component={Link}
          to="/dashboard"
          selected={value === 2}
        >
          <ListItemText>Profil</ListItemText>
        </ListItem>,
        <ListItem
          key={3}
          className={
            value === 3 ? classes.drawerItemSelected : classes.drawerItem
          }
          divider
          button
          onClick={() => setOpenDrawer(false)}
          component={Link}
          to="/logout"
          selected={value === 3}
        >
          <ListItemText>Logout</ListItemText>
        </ListItem>,
      ]
    : null;

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        anchor="right"
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <List disablePadding>
          <ListItem
            className={
              value === 0 ? classes.drawerItemSelected : classes.drawerItem
            }
            divider
            button
            onClick={() => {
              setValue(0);
              setOpenDrawer(false);
            }}
            component={Link}
            to="/"
            selected={value === 0}
          >
            <ListItemText>Događaji</ListItemText>
          </ListItem>
          <ListItem
            className={
              value === 1 ? classes.drawerItemSelected : classes.drawerItem
            }
            divider
            button
            onClick={() => {
              setValue(1);
              setOpenDrawer(false);
            }}
            component={Link}
            to="/aboutus"
            selected={value === 1}
          >
            <ListItemText>O nama</ListItemText>
          </ListItem>
          {notLoggedInDrawerItems}
          {loggedInDrawerItems}
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <Menu className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6">Logo</Typography>
          {matches ? drawer : tabs}
        </Toolbar>
      </AppBar>
    </div>
  );
}
