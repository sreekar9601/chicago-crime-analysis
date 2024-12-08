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

// GET /api/crimes endpoint
// Optional query parameter: ?type=THEFT
app.get('/api/crime', async (req, res) => {
  const crimeType = req.query.type;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 100; // default to 100 if no limit specified
  let query = 'SELECT id, primary_type, latitude, longitude, year FROM crime';
  const params = [];

  if (crimeType) {
    query += ' WHERE primary_type = $1';
    params.push(crimeType.toUpperCase()); // convert to uppercase if your data is uppercase
  }

  // You can add a LIMIT if desired, e.g., `query += ' LIMIT 1000';`
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
  console.log(`API server running at http://localhost:${PORT}/api/crimes`);
});
