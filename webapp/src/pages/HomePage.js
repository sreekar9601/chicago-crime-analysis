// src/pages/HomePage.js
import React, { useState } from 'react';
import useCrimeData from '../hooks/useCrimeData';
import CrimeFilter from '../components/CrimeFilter';
import MapView from '../components/MapView';
import './HomePage.css';

function HomePage() {
  const [crimeType, setCrimeType] = useState('');
  const [limit, setLimit] = useState(100);
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');

  const { crimes, loading } = useCrimeData(crimeType, limit, yearFrom, yearTo);

  return (
    <div className="homepage-container">
      {/* Top Navbar */}
      <div className="top-navbar">
        <ul>
          <li onClick={() => console.log('Home')}>Home</li>
          <li onClick={() => console.log('Reports')}>Reports</li>
          <li onClick={() => console.log('Settings')}>Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-container">
        {/* Left-hand side: Analysis options */}
        <div className="left-panel">
          <h2>Analysis Options</h2>
          <div className="card" onClick={() => console.log('View Charts')}>
            <h3>View Charts</h3>
            <p>Analyze crime trends visually.</p>
          </div>
          <div className="card" onClick={() => console.log('View Map')}>
            <h3>View Map</h3>
            <p>Explore crimes on a map.</p>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-container">
          <div className="map-header">
            <h1>Chicago Crime Map</h1>
            <CrimeFilter
              crimeType={crimeType}
              setCrimeType={setCrimeType}
              limit={limit}
              setLimit={setLimit}
              yearFrom={yearFrom}
              setYearFrom={setYearFrom}
              yearTo={yearTo}
              setYearTo={setYearTo}
            />
          </div>
          <div className="map-content">
            {loading ? <p>Loading...</p> : <MapView crimes={crimes} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
