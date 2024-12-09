const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

// Create an Express application
const app = express();
app.use(cors());

// Set up your PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',         // replace with your DB username
  host: 'localhost',        // replace if your DB is remote
  database: 'crimes',       // replace with your database name
  password: 'password',     // replace with your DB password
  port: 5432                // default PostgreSQL port
});

// GET /api/crime endpoint
// Optional query parameters:
// ?type=THEFT&yearFrom=2015&yearTo=2018&limit=200
app.get('/api/crime', async (req, res) => {
  const crimeType = req.query.type;
  const yearFrom = req.query.yearFrom;
  const yearTo = req.query.yearTo;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 100; // default to 100 if no limit specified

  let query = 'SELECT id, primary_type, latitude, longitude, year FROM crime';
  const params = [];
  const conditions = [];

  if (crimeType) {
    conditions.push(`primary_type = $${conditions.length + 1}`);
    params.push(crimeType.toUpperCase());
  }

  // If yearFrom and yearTo are provided, filter between them
  if (yearFrom && yearTo) {
    conditions.push(`year >= $${conditions.length + 1} AND year <= $${conditions.length + 2}`);
    params.push(parseInt(yearFrom, 10));
    params.push(parseInt(yearTo, 10));
  } else if (yearFrom) {
    // Only a from year provided
    conditions.push(`year >= $${conditions.length + 1}`);
    params.push(parseInt(yearFrom, 10));
  } else if (yearTo) {
    // Only a to year provided
    conditions.push(`year <= $${conditions.length + 1}`);
    params.push(parseInt(yearTo, 10));
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ` LIMIT $${params.length + 1}`;
  params.push(limit);

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}/api/crime`);
});
