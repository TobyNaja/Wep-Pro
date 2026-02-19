const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

// Connect to the SQLite database
const db = new sqlite3.Database('./questions.db', (err) => {
    if (err) console.error(err.message);
    console.log('Connected to questions.db');
});

app.get('/', (req, res) => {
    // Select all questions from the table 
    db.all("SELECT * FROM questions", [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.render('home', { questions: rows });
    });
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});