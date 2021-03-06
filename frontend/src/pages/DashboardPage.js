import React, { useState, useEffect, useContext } from 'react';

import { adaptEvent, sortEventsFunction } from '../utils/helperFunctions';
import djangoAPI from '../api/djangoAPI';
import Schedule from '../components/Schedule';
import ApprovalList from '../components/ApprovalList';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AuthContext from '../context/AuthContext';

export default function Dashboard() {
  const [events, setEvents] = useState(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await djangoAPI.get('/showEvents');
      const events = data
        .map((event) => adaptEvent(event))
        .sort(sortEventsFunction)
        .filter((event) => {
          if (auth.user.is_superuser) return true;
          return event.host === auth.user.id;
        });
      setEvents(events);
    };
    fetchEvents();
  }, []);

  return (
    <Box p={3}>
      {auth.user.is_superuser ? (
        <React.Fragment>
          <Typography variant="h5">
            Moderatori koji čekaju odobrenje:
          </Typography>
          <ApprovalList />{' '}
        </React.Fragment>
      ) : null}
      <Typography variant="h5">Lista vaših događaja:</Typography>
      <Schedule data={events} />
    </Box>
  );
}
