const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());

const pool = new Pool({
  user: 'postgres',         // replace with your DB username
  host: 'localhost',        // replace if your DB is remote
  database: 'crimes',       // replace with your database name
  password: 'password',     // replace with your DB password
  port: 5432                // default PostgreSQL port
});

app.get('/api/crime', async (req, res) => {
  const crimeType = req.query.type;
  const yearFrom = req.query.yearFrom;
  const yearTo = req.query.yearTo;
  const neighborhood = req.query.neighborhood;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 100; 

  let query = 'SELECT c.id, c.primary_type, c.latitude, c.longitude, c.year FROM crime c';
  const params = [];
  const conditions = [];

  if (neighborhood) {
    query += ' JOIN neighborhoods n ON ST_Within(c.geom, n.geom)';
    conditions.push(`n.pri_neigh = $${conditions.length + 1}`);
    params.push(neighborhood);
  }

  if (crimeType) {
    conditions.push(`c.primary_type = $${conditions.length + 1}`);
    params.push(crimeType.toUpperCase());
  }

  if (yearFrom && yearTo) {
    conditions.push(`c.year >= $${conditions.length + 1} AND c.year <= $${conditions.length + 2}`);
    params.push(parseInt(yearFrom, 10));
    params.push(parseInt(yearTo, 10));
  } else if (yearFrom) {
    conditions.push(`c.year >= $${conditions.length + 1}`);
    params.push(parseInt(yearFrom, 10));
  } else if (yearTo) {
    conditions.push(`c.year <= $${conditions.length + 1}`);
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

app.get('/api/neighborhoods', async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT pri_neigh FROM neighborhoods ORDER BY pri_neigh;');
    const neighborhoods = result.rows.map(r => r.pri_neigh);
    res.json(neighborhoods);
  } catch (error) {
    console.error('Error fetching neighborhoods:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/crimeTypes', async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT primary_type FROM crime ORDER BY primary_type;');
    const crimeTypes = result.rows.map(r => r.primary_type);
    res.json(crimeTypes);
  } catch (error) {
    console.error('Error fetching crime types:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}/api/crime`);
});
