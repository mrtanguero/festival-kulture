import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import EventCard from './EventCard';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 16,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1200px',
    width: '100%',
    padding: '25px 0',
    borderBottom: '1px solid #dddddd',
  },

  event: {
    display: 'flex',
    alignItems: 'stretch',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
}));

export default function EventsRow({ events }) {
  const classes = useStyles();
  // console.log(events);

  return (
    <Grid
      className={classes.root}
      direction="row"
      justify="center"
      alignItems="center"
      container
      spacing={2}
    >
      <Grid
        item
        container
        spacing={2}
        xs={12}
        sm={10}
        className={classes.eventsContainer}
      >
        <Grid item xs={12} md={6} lg={4} className={classes.event}>
          <EventCard data={events[0]} />
        </Grid>
        <Grid item xs={12} md={6} lg={4} className={classes.event}>
          {events[1] ? <EventCard data={events[1]} /> : null}
        </Grid>
        <Grid item xs={12} md={6} lg={4} className={classes.event}>
          {events[2] ? <EventCard data={events[2]} /> : null}
        </Grid>
      </Grid>
    </Grid>
  );
}
