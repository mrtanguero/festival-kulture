import React from 'react';
import EventsRow from './EventsRow';

import { testData } from '../temp/testData';
import { Typography } from '@material-ui/core';

export default function Schedule(props) {
  const { data } = props;

  return (
    <div>
      <Typography variant='h1'>Ovo je Raspored</Typography>
    </div>
  );
}
