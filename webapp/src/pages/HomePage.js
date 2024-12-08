// src/pages/HomePage.js
import React, { useState } from 'react';
import useCrimesData from '../hooks/useCrimeData';
import CrimeFilter from '../components/CrimeFilter';
import MapView from '../components/MapView';

function HomePage() {
  const [crimeType, setCrimeType] = useState('');
  const [limit, setLimit] = useState(100);
  
  const { crimes, loading } = useCrimesData(crimeType, limit);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Chicago Crime Map</h1>
      <CrimeFilter
        crimeType={crimeType}
        setCrimeType={setCrimeType}
        limit={limit}
        setLimit={setLimit}
      />
      {loading ? <p>Loading...</p> : <MapView crimes={crimes} />}
    </div>
  );
}

export default HomePage;
