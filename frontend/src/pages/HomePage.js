import React, { useEffect, useState } from 'react';
import { adaptEvent, sortEventsFunction } from '../utils/helperFunctions';
import TabPanels from '../components/TabPanels';

import djangoAPI from '../api/djangoAPI';

export default function HomePage() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await djangoAPI.get('/showEvents');
      const events = data
        .map((event) => adaptEvent(event))
        .sort(sortEventsFunction);
      setEvents(events);
    };
    fetchEvents();
  }, []);

  return <TabPanels events={events} />;
}
