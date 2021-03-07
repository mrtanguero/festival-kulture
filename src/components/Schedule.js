import React from 'react';
import EventCard from './EventCard';
import Grid from '@material-ui/core/Grid';

// import { makeStyles } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   root: {},
// }));

export default function Schedule({ data, day = 0 }) {
  // const classes = useStyles();

  const filteredEventList = data
    ? data
        .filter((festEvent) => {
          if (day === 0) return true;
          else {
            return festEvent.day === day;
          }
        })
        .map((festEvent) => {
          return (
            <Grid key={festEvent.id} item xs={12} sm={6} md={4} lg={3}>
              <EventCard data={festEvent} />
            </Grid>
          );
        })
    : null;

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {filteredEventList}
      </Grid>
    </React.Fragment>
  );
}
