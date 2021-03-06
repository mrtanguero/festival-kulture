import React, { useEffect, useState } from 'react';
import { adaptEvent, sortEventsFunction } from '../utils/helperFunctions';
import TabPanels from '../components/TabPanels';

import djangoAPI from '../api/djangoAPI';

export default function HomePage() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchEvents = async () => {
      const { data } = await djangoAPI.get('/showEvents');
      const events = data
        .map((event) => adaptEvent(event))
        .sort(sortEventsFunction);
      if (isMounted) setEvents(events);
    };
    fetchEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  return <TabPanels events={events} />;
}
