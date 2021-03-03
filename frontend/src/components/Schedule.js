import React from 'react';

// import { makeStyles } from '@material-ui/core';

import EventsRow from './EventsRow';

// const useStyles = makeStyles((theme) => ({
//   root: {},
// }));

export default function Schedule({ data, day }) {
  // const classes = useStyles();

  const makeRows = (data, day) => {
    const rows = [];
    data
      .filter((event) => event.day === day)
      .forEach((event) => {
        if (rows[`${event.time}`]) {
          rows[`${event.time}`].push(event);
        } else {
          rows[`${event.time}`] = [event];
        }
      });
    return rows;
  };

  const dataRows = makeRows(data, day);
  // console.log(dataRows);

  const renderEvents = () => {
    return dataRows.map((row, i) => {
      return (
        // <Grid key={i} item>
        <EventsRow key={i} events={row} />
        // </Grid>
      );
    });
  };

  return (
    // <Grid container direction="column">
    <React.Fragment>{renderEvents()}</React.Fragment>
    // </Grid>
  );
}
