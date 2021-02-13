import React from 'react';
import EventCard from './EventCard';
import EventsRow from './EventsRow';

import { testData } from '../temp/testData';

export default function Schedule(props) {
  const { data } = props;

  return (
    <div>
      <EventCard data={testData[0]} />
    </div>
  );
}
