import React, { useState, useEffect, useContext } from 'react';

import { adaptEvent, sortEventsFunction } from '../utils/helperFunctions';
import djangoAPI from '../api/djangoAPI';
import Schedule from '../components/Schedule';
import ApprovalList from '../components/ApprovalList';
import history from '../utils/history';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AuthContext from '../context/AuthContext';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '90%',
    margin: 'auto',
    paddingTop: 20,
    paddingBottom: 20,
  },
  scheduleTitle: {
    marginBottom: 20,
  },
  fab: {
    position: 'fixed',
    right: 20,
    bottom: 20,
  },
}));

export default function Dashboard() {
  const [events, setEvents] = useState(null);
  const auth = useContext(AuthContext);
  const classes = useStyles();

  useEffect(() => {
    let isMounted = true;
    const fetchEvents = async () => {
      const { data } = await djangoAPI.get('/showEvents');
      const events = data
        .map((event) => adaptEvent(event))
        .sort(sortEventsFunction)
        .filter((event) => {
          if (auth.user.is_superuser) return true;
          return event.host === auth.user.id;
        });
      if (isMounted) setEvents(events);
    };
    fetchEvents();
    return () => {
      isMounted = false;
    };
  }, [auth.user.id, auth.user.is_superuser]);

  return (
    <div className={classes.root}>
      <Fab
        className={classes.fab}
        variant="extended"
        color="secondary"
        onClick={() => {
          history.push('/new-event');
        }}
        aria-label="add"
      >
        <AddIcon />
        Novi događaj
      </Fab>
      {auth.user.is_superuser ? <ApprovalList /> : null}
      <Typography variant="h6" className={classes.scheduleTitle}>
        Lista vaših događaja:
      </Typography>
      <Schedule data={events} />
    </div>
  );
}
