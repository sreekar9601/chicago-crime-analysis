import React from 'react';

function CrimeFilter({ 
  crimeType, setCrimeType, 
  limit, setLimit, 
  yearFrom, setYearFrom, 
  yearTo, setYearTo, 
  neighborhood, setNeighborhood,
  neighborhoods,
  crimeTypes
}) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>
        Crime Type:{' '}
        <select value={crimeType} onChange={(e) => setCrimeType(e.target.value)}>
          <option value="">All</option>
          {crimeTypes.map((ct) => (
            <option key={ct} value={ct}>{ct}</option>
          ))}
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

      <label style={{ marginLeft: '1rem' }}>
        Neighborhood:{' '}
        <select value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)}>
          <option value="">All</option>
          {neighborhoods.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default CrimeFilter;
