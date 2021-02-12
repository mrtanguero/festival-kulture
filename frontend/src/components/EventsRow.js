import React from 'react';
import Grid from '@material-ui/core/Grid';
import EventCard from './EventCard';

export default function EventsRow({ events }) {
  let eventsList = <Grid item>{events[0].time}</Grid>;
  eventsList = eventsList.push(
    ...events.map((event) => {
      return <Grid item component={EventCard(event)} />;
    })
  );

  return <Grid container>{eventsList}</Grid>;
}
