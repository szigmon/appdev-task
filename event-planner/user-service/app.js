const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3002;

const db = new sqlite3.Database('user_database.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the SQLite database for user-service on port 3002');
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

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  )
})