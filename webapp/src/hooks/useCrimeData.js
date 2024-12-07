// src/hooks/useCrimesData.js
import { useState, useEffect } from 'react';

const API_BASE_URL = "http://localhost:4000"; // Adjust if needed

function useCrimesData(crimeType, limit) {
  const [crimes, setCrimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrimes = async () => {
      setLoading(true);
      let url = `${API_BASE_URL}/api/crime?limit=${limit || 100}`;
      if (crimeType && crimeType !== '') {
        url += `&type=${crimeType}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setCrimes(data);
      setLoading(false);
    };
    fetchCrimes();
  }, [crimeType, limit]);

  return { crimes, loading };
}

export default useCrimesData;
