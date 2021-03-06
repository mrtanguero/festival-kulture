import React, { useState, useEffect, useContext } from 'react';

import { adaptEvent, sortEventsFunction } from '../utils/helperFunctions';
import djangoAPI from '../api/djangoAPI';
import Schedule from '../components/Schedule';
import ApprovalList from '../components/ApprovalList';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AuthContext from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    margin: 'auto',
    paddingTop: 20,
    paddingBottom: 20,
  },
  scheduleTitle: {
    marginBottom: 20,
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
      {auth.user.is_superuser ? (
        <React.Fragment>
          <Typography variant="h6">Korisnici koji čekaju odobrenje:</Typography>
          <ApprovalList />
        </React.Fragment>
      ) : null}
      <Typography variant="h6" className={classes.scheduleTitle}>
        Lista vaših događaja:
      </Typography>
      <Schedule data={events} />
    </div>
  );
}
