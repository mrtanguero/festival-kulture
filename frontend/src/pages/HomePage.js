import React from 'react';
import Schedule from '../components/Schedule';

import { testData } from '../temp/testData';

export default function HomePage() {
  return (
    <div>
      <Schedule data={testData} day={1} />
    </div>
  );
}
