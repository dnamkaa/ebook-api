const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ebook_library',
  password: 'db@123',
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

// Get all eBooks
app.get('/ebooks', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM ebooks');
    
    console.log(`vitabu ${rows.map(row => JSON.stringify(row)).join(',')}`);
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
