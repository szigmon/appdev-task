//Event service function
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3001;

// Database Connection
const db = new sqlite3.Database('event_database.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the SQLite database for event service on port 3001');
});

// Enable CORS
app.use(cors());

// Create events table
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      name TEXT
    );`
  , (err) => {
    if (err) console.log(err.message);
  });
});
  
// Enable JSON body parsing
app.use(express.json());

// API Routes
app.get('/events', (req, res) => {
    db.all('SELECT * FROM events', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        } else {
            res.json(rows);
        }
    });
});

app.post('/events', (req, res) => {
    console.log('POST request received');
    const { name, date } = req.body;
    db.run(
      'INSERT INTO events (name, date) VALUES (?, ?)',
      [name , date],
      function (err) {
        if (err) {
          console.error('Error:', err.message);
          res.status(500).send('Server error');
        } else {
          res.json({ id: this.lastID });
        }
      }
    );
});

app.delete('/events/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM events WHERE id = ?', id, (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    } else {
      res.send('Event deleted successfully');
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
