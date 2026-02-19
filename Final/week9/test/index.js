const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('your-db-filename.db', (err) => {    
  if (err) {
      return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});


// static resourse & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');


app.get('/create', function (req, res) {

    // 1️⃣ Create Table
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS employees (
            EmployeeId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            LastName NVARCHAR(20) NOT NULL,
            FirstName NVARCHAR(20) NOT NULL,
            Title NVARCHAR(30),
            Phone NVARCHAR(24),
            Email NVARCHAR(60)
        );
    `;

    db.run(createTableSQL, (err) => {
        if (err) {
            return res.send("Error creating table: " + err.message);
        }

        console.log('Table created successful');

        // 2️⃣ Insert Data
        const insertSQL = `
            INSERT INTO employees 
            (LastName, FirstName, Title, Phone, Email)
            VALUES 
            ('Panda', 'Kungfu', 'Manager', '0812345678', 'panda@email.com');
        `;

        db.run(insertSQL, function (err) {
            if (err) {
                return res.send("Error inserting data: " + err.message);
            }

            console.log("A row has been inserted");

            res.send("Table created and data inserted successfully");
        });
    });

});


app.get('/show', function (req, res) {

  const query = 'SELECT * FROM employees';

  db.all(query, [], (err, rows) => {
    if (err) {
      console.log(err.message);
      return res.send("Error retrieving data");
    }

    console.log(rows);   // ดูข้อมูลใน console

    res.render('show', { data: rows });
  });

});

app.get('/delete/:id', function (req, res) {

  const id = req.params.id;

  const sql = `DELETE FROM employees WHERE EmployeeId = ?`;

  db.run(sql, [id], function (err) {
    if (err) {
      return res.send(err.message);
    }

    console.log(`Row(s) deleted: ${this.changes}`);

    res.redirect('/show');  // กลับไปหน้ารายการ
  });

});

// routing path



// Starting the server
app.listen(port, () => {
   console.log("Server started.");
 });