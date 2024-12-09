// src/components/CrimeFilter.js
import React from 'react';

function CrimeFilter({ crimeType, setCrimeType, limit, setLimit, yearFrom, setYearFrom, yearTo, setYearTo }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>
        Crime Type:{' '}
        <select value={crimeType} onChange={(e) => setCrimeType(e.target.value)}>
          <option value="">All</option>
          <option value="THEFT">THEFT</option>
          <option value="BATTERY">BATTERY</option>
          <option value="NARCOTICS">NARCOTICS</option>
          {/* Add more options as needed */}
        </select>
      </label>

      <label style={{ marginLeft: '1rem' }}>
        From Year:{' '}
        <input
          type="number"
          value={yearFrom}
          onChange={(e) => setYearFrom(e.target.value)}
          placeholder="e.g. 2015"
          style={{ width: '80px' }}
        />
      </label>

      <label style={{ marginLeft: '1rem' }}>
        To Year:{' '}
        <input
          type="number"
          value={yearTo}
          onChange={(e) => setYearTo(e.target.value)}
          placeholder="e.g. 2020"
          style={{ width: '80px' }}
        />
      </label>

      <label style={{ marginLeft: '1rem' }}>
        Limit:{' '}
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          style={{ width: '60px' }}
        />
      </label>
    </div>
  );
}

export default CrimeFilter;
