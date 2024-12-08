// src/components/CrimeFilter.js
import React from 'react';

function CrimeFilter({ crimeType, setCrimeType, limit, setLimit }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>
        Crime Type:{' '}
        <select value={crimeType} onChange={(e) => setCrimeType(e.target.value)}>
          <option value="">All</option>
          <option value="THEFT">THEFT</option>
          <option value="BATTERY">BATTERY</option>
          <option value="NARCOTICS">NARCOTICS</option>
          {/* Add more options based on your data */}
        </select>
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
