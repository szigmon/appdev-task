// User service function
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3002;  // Use environment variable for port
const dbName = process.env.DB_NAME || 'user_database.db';  // Use environment variable for database name

const db = new sqlite3.Database(dbName, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log(`Connected to the SQLite database for user-service on port ${port}`);
});

app.use(cors());
app.use(express.json());

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      fullName TEXT NOT NULL
    )`);
});

app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    });
 });

 app.post('/users', (req, res) => {
    const {username, email, fullName} = req.body;
    const stmt = db.prepare('INSERT INTO users (username, email, fullName) VALUES (?, ?, ?)');
    stmt.run([username, email, fullName], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID });
      }
    });
  });  

  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM users WHERE id = ?', id, (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      } else {
        res.send('User deleted successfully');
      }
    });
  });
  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM users WHERE id = ?', id, (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      } else {
        res.send('User deleted successfully');
      }
    });
  });

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  )
})